import React from 'react';
import './css/Landing.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Header from './Header.js';
import gif1 from './assets/rocket_launch.gif'
import gif2 from './assets/launching-rocket-dribble.gif';


class Landing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      recentLaunch: null
    }
  }

  getRecentLaunch = () =>{
    let url = '';
    if(process.env.NODE_ENV === 'production'){
      url = 'http://ec2-54-226-123-223.compute-1.amazonaws.com/landing';
    }
    else{
      url = '/landing';
    }
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({recentLaunch:data})
    })
  }

  componentDidMount(){
    this.getRecentLaunch();
    fetch('/landing/subscribe')
    .then(response => console.log("subscribers endpoint works"));
  }

  render(){
    return(
      <div className="landing">
        <Header />
        <Carousel autoPlay showThumbs={false}>
          <div>
            <img alt ="rocket" src='https://i.insider.com/5d0d02fde3ecba05703614b3?width=1600&format=jpeg&auto=webp' />
          </div>
          <div>
            <img alt="rocket" src={gif2} />
          </div>
          <div>
            <img alt="rocket" src={gif1} />
          </div>
        </Carousel>
        
      </div>
    );
  }
}

export default Landing; 