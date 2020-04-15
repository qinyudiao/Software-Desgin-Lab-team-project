import React from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import ec2url from './EC2Link';
import {Link} from 'react-router-dom';

class Launches extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          isLoading: true,
          posts: []
        }
    }

componentDidMount(){
  let url = '';
  if(process.env.NODE_ENV === 'production'){
    url = ec2url + '/launch';
  }
  else{
    url = '/launch';
  }
  fetch(url)
  .then(response => response.json())
  .then(data =>{
    console.log(data);
    this.setState({isLoading: false, posts: data});
  });
}

    render(){
      const columns = [
        {
          Header: "Launch",
          accessor: "name",
          Cell: e => <Link to={`/launch/${e.value}`}>{e.value}</Link>
        },
        {
          Header: "Time",
          accessor: "isonet",
        },
        {
          Header: "Launch Service Provider",
          accessor: "lsp.name",
        },
        {
          Header: "Fail Reason",
          accessor: "failreason",
        }
      ]
        return(
          <div>
              <Header />
              <h1 style={{display: "flex", justifyContent: "center"}}>Launches</h1>
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

export default Launches;
