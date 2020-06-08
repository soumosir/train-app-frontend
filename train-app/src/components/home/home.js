import React, { Component } from "react";
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: '',
            is_loading: true,
            error : null,
            train_routes : [],
            source : "bengaluru",
            destination : "vellore",
            day: "all",
            errormessage : "",
            quarter: "all",
            rj: true,
            sd: true,
            ps: true
        };
    }



    componentDidMount() {
        const purl = "http://127.0.0.1:8000/";
        const { source,destination } = this.state;
        
        const filter ="?source="+source+"&destination="+destination
        const url = purl+filter;
        console.log(" in component mounting --url ",url)
        // let data = {
        
        // fetch(url, {
        // method: "GET",
        // headers: {
        //     "Content-Type": "application/json",
        //     // Authorization: this.state.accessToken
        // },
        // body: JSON.stringify(data)
        // })
        fetch(url)
        .then(res => res.json())
        .then(response => this.setTrainRoutes(response))
        .catch(error => this.handleError(error));
    }
    setTrainRoutes(response) {
        //this.setState({
        //this.state.loading = false;
        //})
        console.log(response.statusCode);
        if(response.statusCode=='200'){
        
        console.log(" response -- ",response['data'])
        this.setState({
            train_routes : response['data'],
            is_loading: false,
            error: null,
        })
        }
        else{
            this.setState({
                train_routes : [],
                is_loading : false,
                error: null,
            })
        }
        
        
        
    }

    handleError(errorm) {
        this.setState({
        is_loading: false,
        error: "fetch_failed"
        });
    }

    componentWillUnmount() {

    }

    loadData(event){

        let query_string = "";
        const { source,destination,day,quarter,rj,ps,sd } = this.state;

        const day_obj = {
            "sunday" : 0,
            "monday" : 1,
            "tuesday" : 2,
            "wedday" : 3,
            "thrusday" : 4,
            "friday" : 5,
            "saturday" :6

        }

        if (source!="") query_string+="?source="+source;
        if (destination!="") query_string+="&destination="+destination;
        if (day!="all") query_string+="&start_day="+day_obj[day];
        if (quarter!="all") query_string+="&start_time_quarter="+Number(quarter);
        if (rj && ps && sd) {}
        else{
                if(rj) query_string+="&train_class=RJ";
                if(ps) query_string+="&train_class=PS";
                if(sd) query_string+="&train_class=SD";
            }

        const purl = "http://127.0.0.1:8000/";
        
        const url = purl+query_string;

        // let data = {
        
        // fetch(url, {
        // method: "GET",
        // headers: {
        //     "Content-Type": "application/json",
        //     // Authorization: this.state.accessToken
        // },
        // body: JSON.stringify(data)
        // })
        fetch(url)
        .then(res => res.json())
        .then(response => this.setTrainRoutes(response))
        .catch(error => this.handleError(error));



    }
    validate(){
        const { source,destination } = this.state;
        if (source=="" || source==null) return false;
        if (destination=="" || destination==null) return false;
        return true;

    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log("  in handle submit -- ",this.errormessage)
        if (this.errormessage == null){
            if(this.validate()) this.loadData(event);
            else this.setState({errormessage: "One or more fields are not proper"});
        }
        else{
            this.setState({errormessage: "Error submitting form"});
        }    
      }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let err = '';
        if (nam === "source" || nam ==="destination") {
          if (val =="") {
            err = <strong>You must not leave the field's blank</strong>;
          }
        }
        this.setState({errormessage: err});
        this.setState({[nam]: val});
    }

    handleChange = (event) => {
        this.setState({day:event.target.value});
    }
    handleQuarterChange = (event) => {
        this.setState({quarter:event.target.value});
    }
    
    handleCheckBox = (event) => {
        let nam = event.target.name;
        console.log(nam);
        let x = this.state[nam]
        this.setState({[nam]:!x});
        
    }

    render() {
        const { train_routes, is_loading, error, source, destination,day,quarter,rj,ps,sd } = this.state;
        
        if (is_loading) {
            return <p>Loading ...</p>;
        }

        if(error!=null){
            return <p>{error}</p>;
        }
        const navStyle = {
            color: "grey"
        };

        return (
            
            <div>
                <div className="bigbox">

                    <div className="filterflexbox">
                    <span>Filters Available</span>



                        <form onSubmit={this.mySubmitHandler}>
                            
                            <p>Enter source:</p>
                            <input
                                value={source}
                                type='text'
                                name='source'
                                onChange={this.myChangeHandler}
                            />
                            <p>Enter destination:</p>
                            <input
                                value = {destination}
                                type='text'
                                name='destination'
                                onChange={this.myChangeHandler}
                            />
                            <p>Enter day of the week:</p>
                            <select value={day} onChange={this.handleChange} >
                                <option value="all">All days</option>
                                <option value="sunday">Sunday</option>
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thrusday">Thrusday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                            </select>
                            <p>Enter Quarter of day:</p>
                            <select value={day} onChange={this.handleQuarterChange} >
                                <option value="all">All time</option>
                                <option value="0">midnight-6am</option>
                                <option value="1">6am-12pm</option>
                                <option value="2">12pm-6pm</option>
                                <option value="3">6pm-12am</option>
                                
                            </select>
                            <p>Type of train</p>
                            Rajdhani <input type="checkbox" name='rj' onClick={this.handleCheckBox} checked={rj}  value="1" />
                            Satapdi <input type="checkbox" name='sd' onClick={this.handleCheckBox} checked={sd} value="1" />
                            Passenger <input type="checkbox" name='ps' onClick={this.handleCheckBox} checked={ps} value="1" />
                            <br>
                            </br>
                            {this.state.errormessage}
                            <br></br>
                            <input type='submit' />
                        </form>



                    </div>

                    <div className="customflexbigbox">
                    Train-Routes
                    <div className="custom2flexbox">
                    <span >Source </span>
                    <span >destination</span>
                    <span >Duration </span>
                    <span >Start-Time</span>
                    <span >Train-details-link</span>
                    </div>    
                        
                        {train_routes.map(hit =>
                        
                        <h4 key={hit.id}>
                            
                            <span>Train-id : {hit.train}</span>
                            
                            <div className="customflexbox">
                            <span >{hit.source} </span>
                            <span >{hit.destination} </span>
                            <span >{hit.duration} hr </span>
                            <span> {hit.start_time} </span>
                            <br></br>
                            <Link style={navStyle} to={`/${hit.train}`}>View Train Details</Link>
                        

                            </div>
                            {/* <span>Start time :: </span><span className="customflex">{hit.start_time}</span>
                        */}
                        </h4>
                        )}
                    </div> 

                </div>
                
                 
            </div>
        );
    }
}

export default Home;