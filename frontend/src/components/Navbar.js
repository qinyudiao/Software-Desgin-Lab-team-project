import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';

function Navbar(){
    
    return(
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="about">About<span className="sr-only">(current)</span></a>
                </li>
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
                    <a className="nav-link" href="fail">Failed_Launches<span className="border border-dark"></span></a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="education">Education<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="map">Map<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        More
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item nav-link" href="map">Map<span className="sr-only">(current)</span></a>
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
            </ul>
            <form className="form-inline my-2 my-md-0">
                <ul className="navbar-nav mr-auto">
                    <li><input className="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search"/></li>
                    <li><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button></li>
                </ul>
            </form>
        </div>
        </nav>
    )
}

export default Navbar;


            //         <li className="nav-item">
            //     <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            // </li>