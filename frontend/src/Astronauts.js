import React from 'react';
<<<<<<< HEAD
import NavBar from './NavBar.js';
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import { Link } from 'react-router-dom';

=======
import Header from './Header';
>>>>>>> 750decab24d0fa1accfb7af7f12a7cd8fff60bdd

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
          Cell: e =><a href={'/'+ e.value}> {e.value} </a>
        }
      ]
        return(
<<<<<<< HEAD
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


=======
            <div>
                <Header />
                <h1>Astronauts</h1>
            </div>
>>>>>>> 750decab24d0fa1accfb7af7f12a7cd8fff60bdd
        )
    }
}

export default Astronauts;
