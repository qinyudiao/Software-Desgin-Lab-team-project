import React from 'react';
import Header from './Header.js';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {Link} from 'react-router-dom';
import ec2url from './EC2Link';

class USAstronauts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          posts: []
        }
    }

    componentDidMount(){
      let url = '';
      if(process.env.NODE_ENV === 'production'){
        url = ec2url + '/USAstronauts';
      }
      else{
        url = '/USAstronauts';
      }
      fetch(url)
      .then(response => response.json())
      .then(posts => this.setState({posts: posts}));

      // const url = "https://raw.githubusercontent.com/ShawnVictor/demo/master/db.json";
      // fetch(url, {
      //   method: "GET"
      // }).then(response => response.json()).then(posts => {
      //   this.setState({posts: posts})
      // })
    }

    render(){
      const columns = [
        {
          Header: "Full Name",
          accessor: "Astronaut",
          Cell: e => <Link to={`/USAstronauts/${e.value}`}>{e.value}</Link>
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
          Header: "Total Hours of Space Time",
          accessor: "Cumulative hours of space flight time"
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
              <Header />
              <h1>United States Astronauts</h1>
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

export default USAstronauts;
