import React from 'react';
import NavBar from './NavBar.js';
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"


class Astronauts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          posts: []
        }
    }

    componentDidMount(){
      const url = "https://jsonplaceholder.typicode.com/posts";
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
          accessor: "userId"
        },
        {
          Header: "Company",
          accessor: "id"
        },
        {
          Header: "Country",
          accessor: "title"
        },
        {
          Header: "Status",
          accessor: "body"
        }
      ]
        return(
          <div>
              <NavBar />
              <h1>Astronauts</h1>
              <ReactTable
                columns={columns}
              >


              </ReactTable>
          </div>


        )
    }
}

export default Astronauts;
