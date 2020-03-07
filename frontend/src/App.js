import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Landing from './Landing.js';
import About from './About.js';
import Astronauts from './Astronauts.js';
import USAstronauts from './USAstronauts.js';
import RussianAstronauts from './RussianAstronauts.js';
import InternationalAstronauts from './InternationalAstronauts.js';
import Launches from './Launches.js';
import Launches_backup from './Launches_backup.js';
import Companies from './Companies.js';
import Fail from './Fail.js';
import Map from './Map.js';
import Country from './Country.js';
import Education from './Education.js';
import IndividualLaunch from './IndividualLaunch.js';
import IndividualAstronaut from './IndividualAstronaut.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route path="/" component={Landing} exact />
                    <Route path="/about" component={About} />
                    <Route path="/company" component={Companies} />
                    <Route path="/launch/:launchId" component={IndividualLaunch} />
                    <Route path="/launch" component={Launches} />
                    <Route path="/astronaut" component={Astronauts} />
                    <Route path="/fail" component={Fail} />
                    <Route path="/map" component={Map} />
                    <Route path="/USAstronauts/:astronautId" component={IndividualAstronaut} />
                    <Route path="/USAstronauts" component={USAstronauts} />
                    <Route path="/RussianAstronauts/:astronautId" component={IndividualAstronaut} />
                    <Route path="/RussianAstronauts" component={RussianAstronauts} />
                    <Route path="/InternationalAstronauts/:astronautId" component={IndividualAstronaut} />
                    <Route path="/InternationalAstronauts" component={InternationalAstronauts} />
                    <Route path="/country" component={Country} />
                    <Route path="/education" component={Education} />
                    <Route path="/about" component={About} />
                </Switch>
            </div>
        )
    }
}

export default App;
