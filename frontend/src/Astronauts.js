import React from 'react';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import Header from './components/Header.js';
import {Link} from 'react-router-dom';

class Astronauts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          posts: []
        }
    }

    componentDidMount(){
      const url = "https://raw.githubusercontent.com/ShawnVictor/demo/master/db2.json";
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
          // Cell: e =><a href={'/'+ e.value}> {e.value} </a>
          Cell: e => <Link to={`/${e.value}`}>{e.value}</Link>
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
