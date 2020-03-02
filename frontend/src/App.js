import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Landing from './Landing';
import About from './About';
import Astronauts from './Astronauts.js';
import Launches from './Launches.js';
import Companies from './Companies.js';
import Fail from './Fail.js';
import Map from './Map.js';

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
                </Switch>
            </div>
        )
    }
}

export default App;