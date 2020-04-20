import React, {Component} from 'react';
import './css/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landing from './Landing.js';
import About from './About.js';
import Astronauts from './Astronauts.js';
import USAstronauts from './USAstronauts.js';
import RussianAstronauts from './RussianAstronauts.js';
import InternationalAstronauts from './InternationalAstronauts.js';
import Launches from './Launches.js';
import Agencies from './Agencies.js';
import Failed from './Failed.js';
import Map from './Map.js';
import Education from './Education.js';
import IndividualLaunch from './IndividualLaunch.js';
import IndividualAstronaut from './IndividualAstronaut.js';
import IndividualCompanies from './IndividualAgency.js';
import PageNotFound from './PageNotFound.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpcomingLaunches from './UpcomingLaunches';
import Search from './Search';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            // windowWidth: 100,
            // windowHeight: 100
        }
    }

    // componentWillUnmount() {
    //     window.removeEventListener("resize", this.updateDimensions.bind(this));
    // }

    // updateDimensions() {
    //     let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    //     let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    
    //     this.setState({ windowWidth, windowHeight });
    // }

    render(){
        // const { windowWidth } = this.state;

        // const styles = {
        //   white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        //   black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        // };
        
        return(
            <React.Fragment>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Landing} />
                            <Route path="/search" component={Search} />
                            <Route path="/about" component={About} />
                            <Route path="/agency/:agencyId" component={IndividualCompanies} />
                            <Route path="/agency" component={Agencies} />
                            <Route path="/launch/:launchId" component={IndividualLaunch} />
                            <Route path="/launch" component={Launches} />
                            <Route path="/astronaut" component={Astronauts} />
                            <Route path="/fail" component={Failed} />
                            <Route path="/map" component={Map} />
                            <Route path="/upcoming" component={UpcomingLaunches} />
                            <Route path="/USAstronauts/:astronautId/:type" component={IndividualAstronaut} />
                            <Route path="/USAstronauts" component={USAstronauts} />
                            <Route path="/RussianAstronauts/:astronautId/:type" component={IndividualAstronaut} />
                            <Route path="/RussianAstronauts" component={RussianAstronauts} />
                            <Route path="/InternationalAstronauts/:astronautId/:type" component={IndividualAstronaut} />
                            <Route path="/InternationalAstronauts" component={InternationalAstronauts} />
                            <Route path="/education" component={Education} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </Router>
            </React.Fragment>
        )
    }
}

export default App;
