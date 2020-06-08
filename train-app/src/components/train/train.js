import React, { Component } from "react";
import {Link, withRouter} from 'react-router-dom';
class Train extends Component {
    constructor(props) {
        super(props);
        console.log(" props -- ",props)
        this.state = {
            accessToken: '',
            train: {},
            is_loading: true,
            error: null,
        };
    }



    componentDidMount() {
        

        //api fetch
        this.setState({ is_loading: true });
        const url = 'http://localhost:8000/'+this.props.match.params.id+"/"
        fetch(url)
        .then(res => res.json())
        .then(response => this.setTrain(response))
        .catch(error => this.handleError(error))

    }
    setTrain(response) {
        //this.setState({
        //this.state.loading = false;
        //})
        console.log(response.statusCode);
        if(response.statusCode=='200'){
        
        console.log(" response -- ",response['data'])
        this.setState({
            train : response['data'],
            is_loading: false,
            error: null,
        })
        }
        else{
            this.setState({
                train : [],
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

    

    render() {
        const { train, is_loading, error } = this.state;
 
        if (error) {
            return <p>{error.message}</p>;
        }
    
        if (is_loading) {
            return <p>Loading ...</p>;
        }
        const navStyle = {
            color:"white"
        }
    
        return (
        <div className="bigbox">

            <div className="filterflexbox">
                    <span className="minheightbox"></span>
                    <span className="minheightbox">Train Number</span>
                    <span className="minheightbox">Train Name</span>
                    <span className="minheightbox">Train Path</span>
                    <span className="minheightbox">Train Class</span>
                    <span className="minheightbox">Days operational</span>

            </div>
            <div className="customflexbigbox">
                    <span className="minheightbox"> Train Info</span>
                    <span className="minheightbox">{train.train_number}</span>
                    <span className="minheightbox">{train.train_name}</span>
                    <span className="minheightbox">{train.train_path}</span>
                    <span className="minheightbox">{train.train_class}</span>
                    <span className="minheightbox">{train.days}</span>
                
                    
            </div>
        </div>    
        );
    }
}

export default Train;