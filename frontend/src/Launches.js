import React from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import ec2url from './EC2Link';

class Launches extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          isLoading: true,
          posts: []
        }
    }

    componentDidMount(){
      fetchLaunches()
      .then(data => {
        console.log('data to setState', data);
        this.setState({
          isLoading: false,
          posts: data,
        })
      })
    }

    render(){
      const columns = [
        {
          Header: "Launch",
          accessor: "name",
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

const fetchLaunches = async () => {
  let url = '';
  if(process.env.NODE_ENV === 'production'){
    url = ec2url + '/launch';
  }
  else{
    url = '/launch';
  }
  const response = await fetch(url);
  let launches = await response.json();

  fetchAllDocuments('rocket')
  .then(rockets => {
    console.log('rockets', rockets);
    launches = launches.map(launch => {
      for(const rocket of rockets) {
        if (launch.rocket === rocket._id){
          launch.rocket = rocket;
          break;
        }
      };
    })
  })
  
  // fetchAllDocuments('location')
  // .then(locations => {
  //   console.log(locations);
  //   launches = launches.map(launch => {
  //     console.log(launch);
  //     for(const location of locations) {
  //       if (launch.location === location._id){
  //         launch.location = location;
  //         break;
  //       }
  //     };
  //   })
  // });

  // // get referenced lsps
  // fetchAllDocuments('agency')
  // .then(agencies => {
  //   launches = launches.map(launch => {
  //     for(const agency of agencies) {
  //       if (launch.lsp === agency._id){
  //         launch.lsp = agency;
  //         break;
  //       }
  //     };
  //   })
  // })

  console.log('launches', launches);

  return launches;
}

const fetchAllDocuments = async (type) => {
  console.log('fetching all');
  let url = '';
  if(process.env.NODE_ENV === 'production'){
    url = `${ec2url}/${type}`;
  }
  else{
    url = `/${type}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const fetchSingleDocument = async (type, objectId) => {
  console.log('fetching 1');
  let url = '';
  if(process.env.NODE_ENV === 'production'){
    url = `${ec2url}/${type}/${objectId}`;
  }
  else{
    url = `/${type}/${objectId}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default Launches;
