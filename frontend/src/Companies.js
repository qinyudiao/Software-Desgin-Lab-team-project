import React from 'react';
import Header from './Header.js';
import ReactTable from "react-table-6"
import {Link} from 'react-router-dom'
import "react-table-6/react-table.css"

class Companies extends React.Component{
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
          Header: "Company",
          accessor: "A",
          // Cell: e =><a href={'/' + e.value}> {e.value} hi </a>
          // Cell: e => <Link to={`/launch/${e.value}`}>{e.value}</Link>
          Cell: e => <Link to={`/launch/${e.value}`}>{e.value}</Link>

        },
        {
          Header: "Country",
          accessor: "J",
        },
        {
          Header: "Headquarters",
          accessor: "K",
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

export default Companies;