import React from 'react';
import NavBar from './NavBar.js';
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import { Link } from 'react-router-dom';


class Astronauts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          posts: []
        }
    }

    componentDidMount(){
      const url = "https://raw.githubusercontent.com/ShawnVictor/demo/master/db.json";
      fetch(url, {
        method: "GET"
      }).then(response => response.json()).then(posts => {
        this.setState({posts: posts})
      })
    }

    render(){
      const columns = [
        {
          Header: "Full Name",
          accessor: "Astronaut",
          Cell: e =><a href={'/astronaut/'+e.value}> {e.value} </a>
        },
        {
          Header: "DOB",
          accessor: "Date of birth",
        },
        {
          Header: "Gender",
          accessor: "Gender",
        },
        {
          Header: "Group",
          accessor: "Group"
        },
        {
          Header: "# Flights",
          accessor: "# Flights"
        },
        {
          Header: "Status",
          accessor: "Status",
        },
        {
          Header: "Missions Flown",
          accessor: "Missions flown",
        }
      ]
        return(
          <div>
              <NavBar />
              <h1>Astronauts</h1>
              <ReactTable
                columns={columns}
                data={this.state.posts}
                filterable
              >


              </ReactTable>
          </div>


        )
    }
}

export default Astronauts;
