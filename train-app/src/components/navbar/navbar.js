
import React, { Component } from "react";
import {Link} from 'react-router-dom';
class Navbar extends Component {
    constructor(props) {
        super(props);
    
    }



    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    

    render() {
        const navStyle = {
            color: "white"
        };
        return (
            <nav>
                
                <Link style={navStyle} to="/">
                <h3>Itilite</h3>
                </Link>
                
                <ul className="nav-links">
                    {/* <Link style={navStyle} to="/about"> */}
                        <li>About</li>
                    {/* </Link> */}
                    {/* <Link style={navStyle} to="/shop"> */}
                        <li>Pricing</li>
                     {/* </Link> */}
                    
                     {/* <Link style={navStyle} to="/contact"> */}
                          <li>Contact</li>
                    {/* </Link> */}
                    
                </ul>
            </nav>
        );
    }
}

export default Navbar;