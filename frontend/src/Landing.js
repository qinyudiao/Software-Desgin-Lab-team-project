import React from 'react';
import './Landing.css';
import NavBar from './NavBar.js';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


class Landing extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div className="landing">
        <NavBar className="landingContent" />
        <Carousel autoPlay showThumbs={false}>
          <div>
            <img src='https://i.insider.com/5d0d02fde3ecba05703614b3?width=1600&format=jpeg&auto=webp' />
          </div>
          <div>
            <img src='https://i.insider.com/5d0d02fde3ecba05703614b3?width=1600&format=jpeg&auto=webp' />
          </div>
          <div>
            <img src='https://i.insider.com/5d0d02fde3ecba05703614b3?width=1600&format=jpeg&auto=webp' />
          </div>
        </Carousel>
        
      </div>
    );
  }
}

export default Landing; 