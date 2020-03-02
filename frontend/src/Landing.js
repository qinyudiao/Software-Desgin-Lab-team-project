import React from 'react';
import './Landing.css';
import ReactPlayer from 'react-player';
import video from './assets/rocket_landing_page_video.mp4';
import NavBar from './NavBar.js';


class Landing extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div className="Landing">
        <ReactPlayer className="video" url={video} playing preload loop></ReactPlayer>
        <NavBar />
      </div>
    );
  }
}

export default Landing; 