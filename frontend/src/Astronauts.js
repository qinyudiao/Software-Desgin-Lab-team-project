import React from 'react';
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import { Link } from 'react-router-dom';
import Header from './Header.js';

class Astronauts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          posts: []
        }
    }

    componentDidMount(){
      const url = "https://raw.githubusercontent.com/ShawnVictor/demo/master/launches.json";
      fetch(url, {
        method: "GET"
      }).then(response => response.json()).then(posts => {
        this.setState({posts: posts})
      })
    }

    render(){
      const columns = [
        {
          Header: "Country/Company",
          accessor: "Type",
          Cell: e =><a href={'/'+ e.value}> {e.value} </a>
        }
      ]
        return(
          <div>
              <Header />
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
