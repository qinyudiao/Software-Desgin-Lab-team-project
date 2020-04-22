import React from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {Link} from 'react-router-dom';
import ec2url from './EC2Link';
import { Form, FormControl} from 'react-bootstrap';
import GenerateUSAstronautCards from './components/AstronautCards.js'
import {GenerateRussianAstronautCards, GenerateInternationalAstronautCards} from './components/AstronautCards.js'
import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton, RadioGroup, Radio } from 'react-mdl'



class USAstronauts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          activeTab: 0,
          posts: [],
          filteredposts: [],
          posts2: [],
          filteredposts2: [],
          posts3: [],
          filteredposts3: []
        };
        this.searchName = React.createRef();
    }

    componentDidMount(){
      let url = '';
      if(process.env.NODE_ENV === 'production'){
        url = ec2url + '/USAstronauts';
      }
      else{
        url = 'http://localhost:8080/USAstronauts';
      }
      fetch(url)
      .then(response => response.json())
      .then(posts => this.setState({posts: posts, filteredposts: posts}));

      url = '';
      if(process.env.NODE_ENV === 'production'){
        url = ec2url + '/RussianAstronauts';
      }
      else{
        url = 'http://localhost:8080/RussianAstronauts';
      }
      fetch(url)
      .then(response => response.json())
      .then(posts => this.setState({posts2: posts, filteredposts2: posts}));

      url = '';
      if(process.env.NODE_ENV === 'production'){
        url = ec2url + '/InternationalAstronauts';
      }
      else{
        url = 'http://localhost:8080/InternationalAstronauts';
      }
      fetch(url)
      .then(response => response.json())
      .then(posts => this.setState({posts3: posts, filteredposts3: posts}));
    }

    toggleCategories() {

      if(this.state.activeTab === 0){
        return(
          <div className="projects-grid" style={{display: 'flex'}}>
            <GenerateUSAstronautCards data={this.state.filteredposts}/>
          </div>
        )
      } else if(this.state.activeTab === 1){
        return(
          <div className="projects-grid" style={{display: 'flex'}}>
            <GenerateRussianAstronautCards data={this.state.filteredposts2}/>
          </div>
        )
      } else if(this.state.activeTab === 2){
        return(
          <div className="projects-grid" style={{display: 'flex'}}>
            <GenerateInternationalAstronautCards data={this.state.filteredposts3}/>
          </div>
        )
      }

    }

    handleChange = () =>{
      let vara = this.searchName.current.value
      this.setState({filteredposts: this.state.posts.filter((row) => {
        return row.Astronaut.toString().toLowerCase().includes(vara.toLowerCase())
      })})
      this.setState({filteredposts2: this.state.posts2.filter((row) => {
        return row.A.toString().toLowerCase().includes(vara.toLowerCase())
      })})
      this.setState({filteredposts3: this.state.posts3.filter((row) => {
        return row.A.toString().toLowerCase().includes(vara.toLowerCase())
      })})

      this.toggleCategories()
    }


    render(){
        return(
          <div className="category-tabs">
          <Header />
            <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId})} ripple>
              <Tab>United States</Tab>
              <Tab>Russia</Tab>
              <Tab>International</Tab>
            </Tabs>

            <div className="projects-grid" >
              <Grid>
                <Cell col={1} style={{margin:'auto'}}>
                  <Form inline id="searchform">
                      <FormControl type="text" name="search" id="search" className="mr-sm-2" placeholder="Search by Name" ref={this.searchName} onChange={this.handleChange} />
                  </Form>
                </Cell>
              </Grid>
            </div>
            <Grid>
              <Cell col={12}>
                <div className="content">{this.toggleCategories()}</div>
              </Cell>
            </Grid>

          </div>
        )
    }
}

export default USAstronauts;
