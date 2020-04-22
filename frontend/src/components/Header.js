import React from 'react';
import Navigation from './Navigation.js';
import '../css/Header.css';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="container-full" style={{zIndex:"10"}}>
                <Navigation />
            </div>
        )
    }
}

export default Header;

 //<img className="logo" src={logo} />
