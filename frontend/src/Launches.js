import React from 'react';
import Header from './Header.js';
import ReactTable from "react-table-6"
import {Link} from 'react-router-dom'
import "react-table-6/react-table.css"


class Launches extends React.Component{
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
          Cell: e => <Link to={`launch/${e.value}`}>{e.value}</Link>

        },
        {
          Header: "SFR",
          accessor: "B",
        },
        {
          Header: "Payload(kg)",
          accessor: "C",
        },
        {
          Header: "Launch Cost($M)",
          accessor: "D"
        },
        {
          Header: "Launch Class",
          accessor: "G",
        },
        {
          Header: "Orbital Altitude",
          accessor: "H",
        },
        {
          Header: "Country",
          accessor: "J",
        }
      ]
        return(
          <div>
              <Header />
              <h1>Launches</h1>
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

export default Launches;
