import React from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6"
import {Link} from 'react-router-dom'
import './css/Agencies.css';
import "react-table-6/react-table.css"
import ec2url from './EC2Link';
import {GenerateAgencyCards} from './components/AstronautCards.js'
import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl'


class Agencies extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
          posts: []
      }
    }

    componentDidMount() {
      fetchAgencies()
      .then((posts) => {
        this.setState({posts: posts});
      });
    }

    render(){
        return(
          <div className="category-tabs">
            <Header />
            <div className='cont'>
            <div className="projects-grid" style={{display: 'flex'}}>
              <GenerateAgencyCards data={this.state.posts}/>
            </div>
            </div>
          </div>
        )
    }
}

const fetchAgencies = async () => {
  let url = '';
  if(process.env.NODE_ENV === 'production'){
    url = ec2url + '/agency';
  }
  else{
    url = '/agency';
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default Agencies;
