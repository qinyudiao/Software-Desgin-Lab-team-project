import React from 'react';
import logo from './assets/rocket_launch.gif';
import Navbar from './components/Navbar.js';
import './Header.css';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="container">
                <img className="logo" src={logo} />
                <h2>Every Rocket Launch</h2>
                <Navbar />
            </div>
        )
    }
}

export default Header;