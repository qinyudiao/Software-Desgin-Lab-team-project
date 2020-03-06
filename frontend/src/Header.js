import React from 'react';
import logo from './assets/rocket_launch.gif';
import Navigation from './components/Navigation.js';
import './Header.css';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="container-full">
                <Navigation />
            </div>
        )
    }
}

export default Header;

 //<img className="logo" src={logo} />