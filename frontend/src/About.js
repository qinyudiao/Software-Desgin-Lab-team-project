import React from 'react';
import './About.css';
import Header from './Header';

class About extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <React.Fragment>
                <Header />
                <h1>About</h1>
                <p> EveryRocketLaunch is a comprehensive database of rocket launches designed to give you as much relevant
                information as possible about each and every rocket launch. </p>
                <p> Due to the diverse information available for each rocket launch, this website is designed so that the user can
                easily navigate to whichever sub-section of information regarding rocket launches they want to look at. </p>
                <p> Lastly, EveryRocketLaunch is still in development, and our team welcomes any feedback regarding how to make 
                your experience using our site better! </p>
                <h3>GitHub Statistics</h3>
            </React.Fragment>
        )
    }
}

export default About;
