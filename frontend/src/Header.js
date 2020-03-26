import React from 'react';
import Navigation from './components/Navigation.js';
import './css/Header.css';

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