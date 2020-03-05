import React from 'react';
import logo from './assets/rocket_launch.gif';
import NavBar from './NavBar.js';
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
                <h1>Every Rocket Launch</h1>
                <NavBar />
            </div>
        )
    }
}

export default Header;