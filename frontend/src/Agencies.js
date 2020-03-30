import React from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6"
import {Link} from 'react-router-dom'
import "react-table-6/react-table.css"
import ec2url from './EC2Link';

class Agencies extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
      let url = '';
      if(process.env.NODE_ENV === 'production'){
        url = ec2url + '/companies';
      }
      else{
        url = '/companies';
      }

      fetch(url)
      .then(response => response.json())
      .then(posts => this.setState({posts: posts}));
    }

    render(){
      const columns = [
        {
          Header: "Company",
          accessor: "A",
          // Cell: e =><a href={'/' + e.value}> {e.value} hi </a>
          // Cell: e => <Link to={`/launch/${e.value}`}>{e.value}</Link>
          Cell: e => <Link to={`/company/${e.value}`}>{e.value}</Link>

        },
        {
          Header: "Purpose",
          accessor: "L",
        },
        {
          Header: "Country",
          accessor: "J",
        },
        {
          Header: "Headquarters",
          accessor: "K",
        },
        {
          Header: "Launch Cost($M)",
          accessor: "D"
        }
        ]
        return(
            <div>
              <Header />
              <h1>Agencies</h1>
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

export default Agencies;
