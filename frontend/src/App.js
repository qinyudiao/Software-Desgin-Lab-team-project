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
import Companies from './Companies.js';
import Fail from './Fail.js';
import Map from './Map.js';
import Country from './Country.js';
import Education from './Education.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar.js';

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
                    <Route path="/launch" component={Launches} />
                    <Route path="/astronaut" component={Astronauts} />
                    <Route path="/fail" component={Fail} />
                    <Route path="/map" component={Map} />
                    <Route path="/USAstronauts" component={USAstronauts} />
                    <Route path="/RussianAstronauts" component={RussianAstronauts} />
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
