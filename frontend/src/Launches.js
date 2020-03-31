import React from 'react';
import Header from './components/Header.js';
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"

class Launches extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          isLoading: true,
          posts: []
        }
    }

    componentDidMount(){
      const url = "https://launchlibrary.net/1.4/launch/?limit=5000";
        fetch(url, {
            method: "GET"
        }).then(response => response.json()).then(posts => {
            this.setState({
              isLoading: false,
              posts: posts.launches,
            })
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
