import React from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"

class Launches extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          posts: []
        }
    }

    componentDidMount(){
      const url = "https://launchlibrary.net/1.4/launch?limit=5000";
        fetch(url, {
            method: "GET"
        }).then(response => response.json()).then(posts => {
            this.setState({posts: posts.launches})
            console.log(posts);
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
          accessor: "net",
        },
        {
          Header: "Fail Reason",
          accessor: "failreason",
        },
        {
          Header: "Video",
          accessor: "vidURLs",
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
