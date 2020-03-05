import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';

function NavBar(){
    return(
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="company">Companies</Link>
            <Link to="launch">Launches</Link>
            <Link to="country">Countries</Link>
            <Link to="astronaut">Astronauts</Link>
            <Link to="fail">Failed Launches</Link>
            <Link to="education">Education</Link>
            <Link to="map">Map</Link>
            <Link to="about">About</Link>
        </div>
    )
}

export default NavBar; 