import React, {useState} from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6"
import {Link} from 'react-router-dom'
import "react-table-6/react-table.css"
import './css/Agencies.css';
import ec2url from './EC2Link';
import Pagination from './components/Pagination.js'
import { Form, FormControl} from 'react-bootstrap';
import {GenerateAgencyCards} from './components/AstronautCards.js'
import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl'


class Agencies extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
          posts: [],
          filteredposts: [],
          checkLaunchServiceProvider: false,
          currentPage: 1
      }

      this.searchName = React.createRef();
      this.onCheckChange = this.onCheckChange.bind(this)
    }

    componentDidMount() {
      fetchAgencies()
      .then((posts) => {
        this.setState({posts: posts, filteredposts: posts, currentPosts: posts});
      });
    }

    toggleCategories() {
      let postsPerPage = 10;
      let indexOfLastPost = this.state.currentPage * postsPerPage;
      let indexOfFirstPost = indexOfLastPost - postsPerPage;
      let currentPosts = this.state.filteredposts.slice(indexOfFirstPost, indexOfLastPost)
        if(true){
          return(
            <div className="projects-grid" style={{display: 'flex'}}>
              <GenerateAgencyCards data={currentPosts}/>
            </div>
          )
        }
      }

    handleChange = () =>{
      let vara = this.searchName.current.value
      this.setState({filteredposts: this.state.posts.filter((row) => {
        return row.name.toString().toLowerCase().includes(vara.toLowerCase())
      })})
      this.toggleCategories()
    }

    onCheckChange(e){
      this.setState({
        [e.target.name]: e.target.checked
      })
      if(e.target.checked){
          this.setState({filteredposts: this.state.filteredposts.filter((row) => {
            return row.islsp.toString().toLowerCase().includes("1")
          })})
      }
      else{
        this.componentDidMount()
      }
    }


    render(){
      let postsPerPage = 10;
      let indexOfLastPost = this.state.currentPage * postsPerPage;
      let indexOfFirstPost = indexOfLastPost - postsPerPage;
      let currentPosts = this.state.filteredposts.slice(indexOfFirstPost, indexOfLastPost);
      const paginate = (pageNumber) => {
        this.setState({currentPage: pageNumber})
      }
        return(
          <div className="category-tabs">
            <Header />
            <div className="background-container-1">
            <div className="projects-grid" style={{display: 'flex'}}>
              <Grid>
                <Cell col={1} style={{margin:'auto', border:'groove', width:'200px', background: 'white'}}>
                  <div>
                    <Form inline id="searchform">
                        <FormControl type="text" name="search" id="search" className="mr-sm-2" placeholder="Search by Agency Name" ref={this.searchName} onChange={this.handleChange} />
                    </Form>
                    <input type="checkbox" name="checkLaunchServiceProvider" checked={this.state.checkLaunchServiceProvider} onChange={this.onCheckChange} /> Is Launch Service Provider? <br />
                  </div>
                </Cell>
              </Grid>
            </div>
            <div className="projects-grid" style={{display: 'flex'}}>
              <Cell col={12} style={{margin:'auto'}}>
                <Pagination postsPerPage={postsPerPage} totalPosts={this.state.filteredposts.length} paginate={paginate}/>
              </Cell>
            </div>
            <div className="projects-grid" style={{display: 'flex'}}>
              <div className="content">{this.toggleCategories()}</div>
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
    url = 'http://localhost:8080/agency';
  }
  const response = await fetch(url);
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
}


export default Agencies;
