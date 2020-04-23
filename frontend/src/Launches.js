import React from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import ec2url from './EC2Link';
import {Link} from 'react-router-dom';
import {GenerateLaunchCards} from './components/AstronautCards.js'
import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl'

class Launches extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      posts: []
    }
  }

  componentDidMount(){
    let url = '';
    if(process.env.NODE_ENV === 'production'){
      url = ec2url + '/launch';
    }
    else{
      url = '/launch';
    }
    fetch(url)
    .then(response => response.json())
    .then(data =>{
      console.log(data);
      this.setState({isLoading: false, posts: data});
    });
  }

  render(){
      return(
        <div className="category-tabs">
          <Header />
          <h1 id="upcoming-title" style={{textAlign:"center"}}>All Launches</h1>
          <div className="projects-grid" style={{display: 'flex'}}>
            <GenerateLaunchCards data={this.state.posts}/>
          </div>
        </div>
      )
  }
}

export default Launches;
