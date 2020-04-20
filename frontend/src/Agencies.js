import React from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6"
import {Link} from 'react-router-dom'
import "react-table-6/react-table.css"
import ec2url from './EC2Link';

class Agencies extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
          posts: []
      }
    }

    componentDidMount() {
      fetchAgencies()
      .then((posts) => {
        this.setState({posts: posts});
      });
    }

    render() {
      this.state.posts.forEach(post => {
        post.islsp = post.islsp == 0 ? "" : "✓";
      });
      const columns = [
        {
          Header: "Agency",
          accessor: 'name',
          Cell: e => <Link to={`/agency/${e.value}`}>{e.value}</Link>
        },
        {
          Header: "Country",
          accessor: "countryCode",
        },
        {
          Header: "Is a Launch Service Provider",
          accessor: "islsp",
        },
      ]
        return(
            <div>
              <Header />
              <h1 style={{display: "flex", justifyContent: "center"}}>Agencies</h1>
              {this.state.isLoading ? <h2 style={{display: "flex",  justifyContent: "center"}}>Loading... it takes awhile because of the enormous amount of data!</h2> :
                <ReactTable
                  className="-striped -highlight"
                  columns={columns}
                  data={this.state.posts}
                  filterable/>
              }
          </div>
        )
    }
}

const fetchAgencies = async () => {
  let url = '';
  if(process.env.NODE_ENV === 'production'){
    url = ec2url + '/agency';
  }
  else{
    url = '/agency';
  }
  const response = await fetch('http://localhost:8083/agency');
  const data = await response.json();
  return data;
}

export default Agencies;
