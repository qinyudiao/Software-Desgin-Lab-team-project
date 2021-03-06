import React from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {Link} from 'react-router-dom';
import ec2url from './EC2Link';

class RussianAstronauts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          posts: []
        }
    }

    componentDidMount(){
      let url = '';
      if(process.env.NODE_ENV === 'production'){
        url = ec2url + '/RussianAstronauts';
      }
      else{
        url = '/RussianAstronauts';
      }
      fetch(url)
      .then(response => response.json())
      .then(posts => this.setState({posts: posts}));
    }

    render(){
      const columns = [
        {
          Header: "Full Name",
          accessor: "A",
          Cell: e => <Link to={`/RussianAstronauts/${e.value}/RussianAstronauts`}>{e.value}</Link>
        },
        {
          Header: "# Flights",
          accessor: "B",
        },
        {
          Header: "Status",
          accessor: "C",
        },
        {
          Header: "Gender",
          accessor: "D"
        },
        {
          Header: "Date of Birth",
          accessor: "E"
        },
        {
          Header: "Missions Flown",
          accessor: "F"
        },
        {
          Header: "Cumulative hours of Space Flight",
          accessor: "G",
        }
      ]
        return(
          <div>
              <Header />
              <h1>Russian Astronauts</h1>
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

export default RussianAstronauts;
