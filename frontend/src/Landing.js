import React from 'react';
import './css/Landing.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Header from './components/Header.js';
import gif1 from './assets/rocket_launch.gif'
import gif2 from './assets/launching-rocket-dribble.gif';
import SubscriberForm from './components/SubscriberForm';
import UnsubscriberForm from './components/UnsubscriberForm';
import ec2url from './EC2Link';

class Landing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      recentLaunch: null,
      renderRecentLaunch: false,
    }
  }

  getRecentLaunch = () =>{
    let url = '';
    if(process.env.NODE_ENV === 'production'){
      url = ec2url + '/landing';
    }
    else{
      url = '/landing';
    }
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({recentLaunch:data});
      this.setState({renderRecentLaunch: true});
    });
  }

  componentDidMount(){
    this.getRecentLaunch();
  }

  render(){
    return(
      <div className="landing">
        <Header />
        <div className="nextLaunchContainer">
          {this.state.renderRecentLaunch ? (<h3>Next Launch: {this.state.recentLaunch['launchDescription']}</h3>) : (null)}
        </div>
        <table>
        <tr className="tableContainer">
        <td width="200vw">
            <Carousel autoPlay showThumbs={false}>
              <div>
                <img alt="rocket" src={gif2} />
                </div>
              <div>
                <img alt ="rocket" src='https://i.insider.com/5d0d02fde3ecba05703614b3?width=1600&format=jpeg&auto=webp' />
                </div>
              <div>
                <img alt="rocket" src={gif1} />
              </div>
              </Carousel>
            </td>
          <td width="30vw">
            <SubscriberForm />

            <UnsubscriberForm />
            </td>
            </tr>
            </table>
      </div>
    );
  }
}

export default Landing;
