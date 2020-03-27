import React from 'react';
import Header from './Header.js';
import ReactPlayer from 'react-player'; 
import { Layout } from "./components/Layout.js";

class Education extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <p>
                    <a href="https://www.nasa.gov/audience/forstudents/5-8/features/nasa-knows/vehicles/index.html">Information from NASA about rockets.</a><br/>
                    <a href="https://www.kennedyspacecenter.com/launches-and-events">See information about upcoming launches.</a><br/>
                    <a href="https://www.nationalgeographic.com/science/space/reference/rockets-and-rocket-launches-explained/">Check out this National Geographic article.</a>
                </p>
                <ReactPlayer url="https://www.youtube.com/watch?v=1yBwWLunlOM"/>
            </div>
        )
    }
}

export default Education;
