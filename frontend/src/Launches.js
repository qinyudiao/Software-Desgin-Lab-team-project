import React from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import './css/Launches.css';
import ec2url from './EC2Link';
import {Link} from 'react-router-dom';
import Pagination from './components/Pagination.js'
import { Form, FormControl} from 'react-bootstrap';
import {GenerateLaunchCards} from './components/AstronautCards.js'
import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl'

class Launches extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      posts: [],
      filteredposts: [],
      checkIfFailure: false,
      checkMostRecentLaunches: false,
      currentPage: 1
    }
    this.searchName = React.createRef();
    this.onCheckChange = this.onCheckChange.bind(this)
    this.toggleSortDate = this.toggleSortDate.bind(this)
  }

  componentDidMount() {
    fetchLaunches()
    .then((posts) => {
      this.setState({isLoading: false, posts: posts, filteredposts: posts});
    });
  }

  toggleCategories() {
    let postsPerPage = 50;
    let indexOfLastPost = this.state.currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = this.state.filteredposts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => {
      this.setState({currentPage: pageNumber})
    }
    if(true){
      return(
        <div className="projects-grid" style={{display: 'flex'}}>
          <GenerateLaunchCards data={currentPosts}/>
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


  toggleSortDate (event)
  {
    const {filteredposts} = this.state
    let newfilteredposts = filteredposts.reverse()
    this.setState({
        filteredposts: newfilteredposts.sort((a, b) => a.name > b.name)
    })
  }


  onCheckChange(e){
    this.setState({
      [e.target.name]: e.target.checked
    })
    if(e.target.checked){
      if(e.target.name === 'checkIfFailure')
        this.setState({filteredposts: this.state.filteredposts.filter((row) => {
          return row.name.toString().toLowerCase().includes("+")
        })})
    }
    else{
      this.componentDidMount()
    }
  }


  render(){
    let postsPerPage = 50;
    let indexOfLastPost = this.state.currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = this.state.filteredposts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => {
      this.setState({currentPage: pageNumber})
    }
      return(
      <div className="category-tabs">
        <Header />
        <div className="background-container-2">
        <div className="projects-grid" style={{display: 'flex'}}>
          <Grid>
            <Cell col={1} style={{margin:'auto', border:'groove', width:'200px', background: 'white'}}>
              <div>
                <Form inline id="searchform">
                    <FormControl type="text" name="search" id="search" className="mr-sm-2" placeholder="Search by Launch Title" ref={this.searchName} onChange={this.handleChange} />
                </Form>
                <input type="checkbox" name="checkIfFailure" checked={this.state.checkIfFailure} onChange={this.onCheckChange} /> Failed Launches <br />
                <button onClick={this.toggleSortDate}>Show most recent Launches</button>
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

const fetchLaunches = async () => {
  let url = '';
  if(process.env.NODE_ENV === 'production'){
    url = ec2url + '/launch';
  }
  else{
    url = 'http://localhost:8080/launch';
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


export default Launches;
