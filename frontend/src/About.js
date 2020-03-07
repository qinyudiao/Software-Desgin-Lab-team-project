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
            contributors: [],
            issues: [],
            issuesCount: {'musa': 0, 'jack' : 0, 'kenan': 0, 'lucas': 0, 'shawn': 0}
        }

        this.computeIssues = this.computeIssues.bind(this);
    }

    // Iterate through issues and increment count for each person 
    // Counts open issues
    computeIssues(){
      for(let i = 0; i < this.state.issues.length; i++){
        console.log(this.state.issues[i]);
        if(this.state.issues[i].assignees.length){
          for(let j = 0; j < this.state.issues[i].assignees.length; j++){
            console.log("goes here");
            if(this.state.issues[i].assignees[j].login){
              if(this.state.issues[i].assignees[j].login == 'qinyudiao'){
                console.log("jack");
                this.state.issuesCount['jack']++;
              }
              else if(this.state.issues[i].assignees[j].login == 'musarafik'){
                this.state.issuesCount['musa']++;
              }
              else if(this.state.issues[i].assignees[j].login == 'ShawnVictor'){
                this.state.issuesCount['shawn']++;
              }
              else if(this.state.issues[i].assignees[j].login == 'KenaHu'){
                this.state.issuesCount['kenan']++;
              }
              else if(this.state.issues[i].assignees[j].login == 'LBest42'){
                this.state.issuesCount['lucas']++;
              }
            }
          }
        }
        console.log(this.state.issues[i]);
      }
    }

    componentDidMount(){
      // Get commits from Github
      const urlContributors = 'https://api.github.com/repos/qinyudiao/Software-Desgin-Lab-team-project/contributors';
      const urlIssues = 'https://api.github.com/repos/qinyudiao/Software-Desgin-Lab-team-project/issues?state=all';
      fetch(urlContributors, {
        method: "GET"
      }).then(response => response.json())
      .then(contributors => {
        console.log(contributors);
        this.setState({contributors: contributors})
      })

      // Get issues from Github
      fetch(urlIssues, {
        method: "GET"
      }).then(response => response.json())
      .then(issues => {
        console.log(issues);
        this.setState({issues: issues});
        this.computeIssues();
        // this.setState({ contributors: [this.state.contributors , this.state.issuesCount]}) //another array
        console.log(this.state.contributors);
        console.log(this.state.issuesCount);

      })
    }


    render(){
            const columns = [
                {
                  Header: "Team Member",
                  accessor: "login",
                  Cell: e => <p>{e.value}</p>
                },
                {
                  Header: "Commits",
                  accessor: "contributions",
                },
                {
                  Header: "Issues",
                  accessor: "issues"
                }
                ]
        return(
            <React.Fragment>
                <Header />
                <div>
                </div>
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
