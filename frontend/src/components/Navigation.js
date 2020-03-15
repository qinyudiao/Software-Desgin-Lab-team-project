import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { Navbar} from 'react-bootstrap'

function Navigation(){
    
    return(
            <Navbar className="navbar navbar-expand-sm navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">Every_Rocket_Launch</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/launch">Launches</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/company">Companies</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/country">Countries</NavLink>
                        </li>
                       <li className="nav-item active">
                            <NavLink className="nav-link" to="/astronaut">Astronauts</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/fail">Failed_Launches</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/education">Education</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/map">Map</NavLink>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-md-0">
                        <ul className="navbar-nav mr-auto">
                            <li><input className="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search"/></li>
                            <li><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button></li>
                        </ul>
                    </form>
                </div>
            </Navbar>
    )
}

export default Navigation;