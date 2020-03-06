import React from 'react';
import './About.css';
import ReactTable from "react-table-6"
import Header from './Header';
import {Link} from 'react-router-dom'
import "react-table-6/react-table.css"

class About extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contributors: []
        }
    }



    // Need to figure out how to update from https://api.github.com/repos/qinyudiao/Software-Desgin-Lab-team-project/contributors
    componentDidMount(){
      const url = "https://raw.githubusercontent.com/LBest42/demo/master/db.json";
      fetch(url, {
        method: "GET"
      }).then(response => response.json()).then(contributors => {
        this.setState({contributors: contributors})
      })
    }


    render(){

            const columns = [
                {
                  Header: "Team Member",
                  accessor: "login",
                  // Cell: e =><a href={'/' + e.value}> {e.value} hi </a>
                  // Cell: e => <Link to={`/launch/${e.value}`}>{e.value}</Link>
                  Cell: e => <Link to={`/launch/${e.value}`}>{e.value}</Link>

                },
                {
                  Header: "Commits",
                  accessor: "contributions",
                }
                ]
        return(
            <React.Fragment>
                <Header />
                <h1>About</h1>
                <p> EveryRocketLaunch is a comprehensive database of rocket launches designed to give you as much relevant
                information as possible about each and every rocket launch. </p>
                <p> Due to the diverse information available for each rocket launch, this website is designed so that the user can
                easily navigate to whichever sub-section of information regarding rocket launches they want to look at. </p>
                <p> Lastly, EveryRocketLaunch is still in development, and our team welcomes any feedback regarding how to make 
                your experience using our site better! </p>
                <h3>GitHub Statistics</h3>
                <ReactTable
                columns={columns}
                data={this.state.contributors}
                filterable>
                </ReactTable>
            </React.Fragment>
        )
    }
}

export default About;
