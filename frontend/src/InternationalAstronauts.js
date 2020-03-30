import React from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {Link} from 'react-router-dom';
import ec2url from './EC2Link';

class InternationalAstronauts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          posts: []
        }
    }

    componentDidMount(){
      let url = '';
      if(process.env.NODE_ENV === 'production'){
        url = ec2url + '/InternationalAstronauts';
      }
      else{
        url = '/InternationalAstronauts';
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
          Cell: e => <Link to={`/InternationalAstronauts/${e.value}`}>{e.value}</Link>
        },
        {
          Header: "Selection",
          accessor: "B",
        },
        {
          Header: "Agency",
          accessor: "C",
        },
        {
          Header: "Country",
          accessor: "D"
        },
        {
          Header: "# U.S. Flights",
          accessor: "E"
        },
        {
          Header: "Status",
          accessor: "F"
        },
        {
          Header: "Gender",
          accessor: "G",
        },
        {
          Header: "Job on Flight",
          accessor: "H",
        }
      ]
        return(
          <div>
              <Header />
              <h1>International Astronauts</h1>
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

export default InternationalAstronauts;
