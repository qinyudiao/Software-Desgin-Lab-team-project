import React from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6"
import {Link} from 'react-router-dom'
import "react-table-6/react-table.css"
import ec2url from './EC2Link';
import { Form, FormControl} from 'react-bootstrap';
import {GenerateAgencyCards} from './components/AstronautCards.js'
import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl'


class Agencies extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
          posts: [],
          filteredposts: [],
          checkLaunchServiceProvider: false
      }
      this.searchName = React.createRef();
      this.onCheckChange = this.onCheckChange.bind(this)
    }



    componentDidMount() {
      fetchAgencies()
      .then((posts) => {
        this.setState({posts: posts, filteredposts: posts});
      });
    }


    toggleCategories() {
        if(true){
          return(
            <div className="projects-grid" style={{display: 'flex'}}>
              <GenerateAgencyCards data={this.state.filteredposts}/>
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
        return(
          <div className="category-tabs">
            <Header />
            <div className="projects-grid" style={{display: 'flex'}}>
              <Grid>
                <Cell col={1} style={{margin:'auto', border:'groove', width:'200px'}}>
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
              <div className="content">{this.toggleCategories()}</div>
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
  const data = await response.json();
  return data;
}


export default Agencies;
