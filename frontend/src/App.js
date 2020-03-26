import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
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
import IndividualLaunch from './IndividualLaunch.js';
import IndividualAstronaut from './IndividualAstronaut.js';
import IndividualCompanies from './IndividualCompanies.js';
import PageNotFound from './PageNotFound/PageNotFound.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            windowWidth: 100,
            windowHeight: 100
        }
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
      }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    updateDimensions() {
        let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    
        this.setState({ windowWidth, windowHeight });
    }

    render(){
        const { windowWidth } = this.state;

        const styles = {
          white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        };
        
        return(
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route path="/about" component={About} />
                        <Route path="/company/:companyId" component={IndividualCompanies} />
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
                        <Route component={PageNotFound} />
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }
}

export default App;
