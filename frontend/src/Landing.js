import React from 'react';
import './Landing.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Header from './Header.js';
import gif1 from './assets/rocket_launch.gif'
import gif2 from './assets/launching-rocket-dribbble.gif';


class Landing extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div className="landing">
        <Header />
        <Carousel autoPlay showThumbs={false}>
          <div>
            <img src='https://i.insider.com/5d0d02fde3ecba05703614b3?width=1600&format=jpeg&auto=webp' />
          </div>
          <div>
            <img src={gif2} />
          </div>
          <div>
            <img src={gif1} />
          </div>
        </Carousel>
        
      </div>
    );
  }
}

export default Landing; 