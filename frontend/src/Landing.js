import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import './css/Landing.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Header from './components/Header.js';
import launch1 from './assets/launch1.jpg'
import launch2 from './assets/launch2.jpg'
import launch3 from './assets/launch3.jpg';
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
      <div style={{width: '100%', margin: 'auto'}}>
      <Header className="header-color" title="Title" scroll>
        <div className="nextLaunchContainer">
          {this.state.renderRecentLaunch ? (<h3>Next Launch: {this.state.recentLaunch['launchDescription']}</h3>) : (null)}
        </div>
      </Header>
        <Grid className="landing-grid" style={{width: '100%'}}>
          <Cell col={12}>
          <Carousel autoPlay showThumbs={false} autoLoop={true} interval="10000" wrap={true} infiniteLoop={true}>
            <div>
              <img alt ="rocket" src={launch1} height="750"/>
              <div style={{background: '#000', width:'100%', position:'relative', top:'-80px', color:"white", opacity:"0.5"}}>
                <h1 style={{textAlign:'left'}}>NASA's STS-125 Shuttle Launch</h1>
                <p style={{textAlign:'left'}}>Nasa puts the latest Hubble Space Telescope into Orbit!</p>
              </div>
            </div>
            <div>
              <img alt ="rocket" src={launch2} height="750"/>
              <div style={{background: '#000', width:'100%', position:'relative', top:'-80px', color:"white", opacity:"0.5"}}>
                <h1 style={{textAlign:'left', textColor:"#fff"}}>BLUE ORIGIN's New Shepard Launch</h1>
                <p style={{textAlign:'left'}}>Blue Origin performs its 12th launch and landing test!</p>
              </div>
            </div>
            <div>
              <img alt ="rocket" src={launch3} height="750"/>
              <div style={{background: '#000', width:'100%', position:'relative', top:'-80px', color:"white", opacity:"0.5"}}>
                <h1 style={{textAlign:'left', textColor:"#fff"}}>SpaceX's Falcon Heavy Launch</h1>
                <p style={{textAlign:'left'}}>SpaceX's performs its first Falcon Heavy launch with a Tesla Roadster in its payload!</p>
              </div>
            </div>
            </Carousel>
            <div style={{background: '#000', width:'100%', position:'relative', top:'-80px', color:"white"}}>
              <SubscriberForm />
              <UnsubscriberForm />
            </div>
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default Landing;
