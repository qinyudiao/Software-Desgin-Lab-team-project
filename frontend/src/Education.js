import React, {Component} from 'react';
import './css/Education.css';
import Header from './components/Header.js';
import ReactPlayer from 'react-player';


class Education extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <div id="education-flex-container">
                    <div className="education-container">
                        <h1 id="education-title">Education </h1>
                    </div>
                    <p align="center">
                    <ReactPlayer width="70vw" height="70vh" url="https://www.youtube.com/watch?v=1yBwWLunlOM"/>
                    </p>
                    <div className="education-container">
                        <p className="education-info-box">
                            A rocket launch is the takeoff phase of the flight of a rocket. Launches for orbital spaceflights, or into interplanetary space, are usually from a fixed location on the ground, but would also be possible from an aircraft or ship. Launches of suborbital flights (including missile launches), can also be from:

                            a missile silo
                            a mobile launcher vehicle ( generally built for the operation)
                            a submarine ( especially if military )
                            air launch:
                            from a plane (e.g. Scaled Composites SpaceShipOne, Pegasus Rocket, X-15)
                            from a balloon ,
                            a surface ship (Aegis Ballistic Missile Defense System) or ocean-based platform (Sea Launch)
                            an inclined rail (e.g. rocket sled launch)
                            .Launches not into space can also be from:

                            the shoulder
                            .A skyrocket is launched from some stand.

                            "Rocket launch technologies" generally refers to the entire set of systems needed to successfully launch a vehicle, not just the vehicle itself, but also the firing control systems, ground control station, launch pad, and tracking stations needed for a successful launch and/or recovery.
                        </p>
                        <p className="education-info-box">
                            Orbital launch vehicles commonly take off vertically, and then begin to progressively lean over, usually following a gravity turn trajectory.
                            Once above the majority of the atmosphere, the vehicle then angles the rocket jet, pointing it largely horizontally but somewhat downwards, which permits the vehicle to gain and then maintain altitude while increasing horizontal speed. As the speed grows, the vehicle will become more and more horizontal until at orbital speed, the engine will cut off.
                            All current vehicles stage, that is, jettison hardware on the way to orbit. Although vehicles have been proposed which would be able to reach orbit without staging, none have ever been constructed, and, if powered only by rockets, the exponentially increasing fuel requirements of such a vehicle would make its useful payload tiny or nonexistent. Most current and historical launch vehicles "expend" their jettisoned hardware, typically by allowing it to crash into the ocean, but some have recovered and reused jettisoned hardware, either by parachute or by propulsive landing.
                            When launching a spacecraft to orbit, a "dogleg" is a guided, powered turn during ascent phase that causes a rocket's flight path to deviate from a "straight" path. A dogleg is necessary if the desired launch azimuth, to reach a desired orbital inclination, would take the ground track over land (or over a populated area, e.g. Russia usually does launch over land, but over unpopulated areas), or if the rocket is trying to reach an orbital plane that does not reach the latitude of the launch site. Doglegs are undesirable due to extra onboard fuel required, causing heavier load, and a reduction of vehicle performance.
                        </p>
                        <p className="education-info-box">
                            <a href="https://www.nasa.gov/audience/forstudents/5-8/features/nasa-knows/vehicles/index.html" style={{color: "#54b85e"}}>Check out the information from NASA about rockets.</a><br/>
                            <a href="https://www.kennedyspacecenter.com/launches-and-events" style={{color: "#54b85e"}}>Check out information about NASA's upcoming launches.</a><br/>
                            <a href="https://www.nationalgeographic.com/science/space/reference/rockets-and-rocket-launches-explained/" style={{color: "#54b85e"}}>Check out this National Geographic article.</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Education;
