import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';

function Navbar(){
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="launch">Launches<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="company">Companies<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="country">Countries<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="astronaut">Astronauts<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="fail">FailedLaunches<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="education">Education<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                More
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </li>

            </ul>
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        </nav>
    )
}

export default Navbar;


        // <div className="navbar">
        //     <Link to="/">Home</Link>
        //     <Link to="launch">Launches</Link>
        //     <Link to="company">Companies</Link>
        //     <Link to="country">Countries</Link>
        //     <Link to="astronaut">Astronauts</Link>
        //     <Link to="fail">Failed Launches</Link>
        //     <Link to="education">Education</Link>
        //     <Link to="map">Map</Link>
        //     <Link to="about">About</Link>
        // </div>

            //         <li className="nav-item">
            //     <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            // </li>