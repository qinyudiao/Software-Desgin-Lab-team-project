import React from 'react';
import './About.css';
import Header from './Header';
import Contributor from './components/Contributor';

class About extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contributors: [],
            issues: [],
            issuesCount: {'musa': 0, 'jack' : 0, 'kenan': 0, 'lucas': 0, 'shawn': 0},
            githubStats: null
        }

    }

    // Sends get request to node server
    // Response comes in an array with order issues, contributors
    getGitHubStats = () => {
      fetch('/about')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({contributors: data[1]})
        this.setState({issues: data[0]})
        this.computeIssues();
        console.log(this.state.contributors); 
        console.log(this.state.issuesCount);
        this.setState({showStats: true});
        this.combineIssuesCommits();
      })
      .catch(err => console.log(err))
    }  


    // Counts issues for each person 
    // Iterate through issues and increment corresponding person's count
    computeIssues = () => {
      for(let i = 0; i < this.state.issues.length; i++){
        if(this.state.issues[i].assignees.length){
          for(let j = 0; j < this.state.issues[i].assignees.length; j++){
            if(this.state.issues[i].assignees[j].login){
              let incrementedIssues = this.state.issuesCount; // Create copy of issuesCount that gets incremented so we can set state afterwards
                                                              // for proper React way of updating state
              switch(this.state.issues[i].assignees[j].login){
                case 'qinyudiao':
                  incrementedIssues.jack++;
                  this.setState({issuesCount: incrementedIssues});       
                  break;
                case 'musarafik':
                  incrementedIssues.musa++;
                  this.setState({issuesCount: incrementedIssues});
                  break;
                case 'ShawnVictor':
                  incrementedIssues.shawn++;
                  this.setState({issuesCount: incrementedIssues});
                  break;
                case 'KenaHu':
                  incrementedIssues.kenan++;
                  this.setState({issuesCount: incrementedIssues});
                  break;
                case 'LBest42':
                  incrementedIssues.lucas++
                  this.setState({issuesCount: incrementedIssues});
                  break;
              }
            }
          }
        }
      }
    }

    componentDidMount(){
      this.getGitHubStats();
    }

    // Create one object that contains name, issues and commits
    combineIssuesCommits = () =>{
      // 'contributor': ['name', issues, commits]
      let parent = {
        'musa': [
          'Musa Rafik', 
          0, 
          0, 
          "Fifth Year Electrical & Computer Engineering Major (Software Engineering Track) at UT Austin",
          "Fullstack and Deployment"
        ],
        'jack': [
          'Jack Diao', 
          0, 
          0,
          "Fourth Year Electrical & Computer Engineering Major (Software Engineering & Integrated Circuits Tracks) at UT Austin",
          "Fullstack and Deployment"
        ],
        'kenan': [
          'Kenan Hurd', 
          0, 
          0,
          "Third Year Electrical & Computer Engineering Major (Software Engineering Track) at UT Austin",
          "Frontend"
        ],
        'lucas': [
          'Lucas Best', 
          0, 
          0,
          "Fourth Year Electrical & Computer Engineering Major (Software Engineering Track) at UT Austin",
          "Backend"
        ],
        'shawn': [
          'Shawn Victor', 
          0, 
          0,
          "Fourth Year Electrical & Computer Engineering Major (Embedded Systems & Software Engineering Tracks) at UT Austin",
          "Frontend"
        ]
      };

      // Iterate through issues and add info to parent 
      for(let [key, value] of Object.entries(this.state.issuesCount)){
        parent[key][1] = value;
      }

      // Iterate through commits and add info to parent
      for(let i = 0; i < this.state.contributors.length; i++){
        switch(this.state.contributors[i].login){
          case 'musarafik':
            parent['musa'][2] = this.state.contributors[i].contributions;
            break;
          case 'qinyudiao':
            parent['jack'][2] = this.state.contributors[i].contributions;
            break;
          case 'LBest42':
            parent['lucas'][2] = this.state.contributors[i].contributions;
            break;
          case 'ShawnVictor':
            parent['shawn'][2] = this.state.contributors[i].contributions;
            break;
          case 'KenaHu':
            parent['kenan'][2] = this.state.contributors[i].contributions;
            break;
        }
      }

      // Create an array of Contributor components with parent info passed to each component
      let githubStatsContainer = Object.keys(parent).map(obj =>{
        return <Contributor 
          name={parent[obj][0]} 
          commits={parent[obj][2]}
          issues={parent[obj][1]}
          major={parent[obj][3]} 
          responsibilities={parent[obj][4]} 
          src={parent[obj][5]} />
      })

      this.setState({githubStats: githubStatsContainer});
     }
    
    render(){
      const renderTeamCommits = () =>{
        let totalCommits = 0;
        for(let i = 0; i < this.state.contributors.length; i++){
          totalCommits += this.state.contributors[i].contributions;
        }

        return <p>{totalCommits} total commits</p>
      }

      const renderTeamIssues = () =>{
        let totalIssues = 0; 
        for(let key of Object.entries(this.state.issuesCount)){
          console.log(key[1]);
          totalIssues += key[1];
        }

        return <p>{totalIssues} total issues</p>
      }

      return(
        <div>
          <Header />

          <h1>About</h1>

          <p> 
            EveryRocketLaunch is a comprehensive database of rocket launches designed to give you as much relevant information
            as possible about each and every rocket launch.
          </p>
          
          <p>
            Due to the diverse information available for each rocket launch, this website is designed so that the user can 
            easily navigate to whichever sub-section of information regarding rocket launches they want to look at. 
          </p>

          <p>
            Lastly, EveryRocketLaunch is still in development, and our team welcomes any feedback regarding how to make your
            experience using our site better!
          </p>

          {this.state.githubStats ?
            (<div>
              <h3>Meet the Team</h3>
              {this.state.githubStats}
            </div>)
          :
            (null)
          }

          <h3>Statistics</h3>
          {renderTeamCommits()}
          {renderTeamIssues()}

          <h3>Data</h3>
          {/* TODO: get data sources */}

          <h3>Tools</h3>
          <p>Frontend built with React, JavaScript, CSS, HTML and Bootstrap</p>
          <p>Backend built with NodeJS</p>
          <p>Stored data in MongoDB</p>
          <p>Hosted on Amazon Webservices (Frontend: S3 Backend: EC2)</p>
          <p>Automatic Deployment with Docker and Travis CI</p>

          <a href="https://github.com/qinyudiao/Software-Desgin-Lab-team-project">Take a look at our repo!</a>
        </div>
      );
    }
}

export default About;
