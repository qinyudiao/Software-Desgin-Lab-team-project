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
          "TODO"
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
          "TODO"
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
          {/* TODO: get statistics from github */}

          <h3>Data</h3>
          {/* TODO: get data sources */}

          <h3>Tools</h3>
          <p>React</p>
          <p>Node</p>
          <p>Bootstrap</p>
          <p>Amazon Web Services</p>
          <p>Docker</p>
          <p>Travis CI</p>

          <a href="https://github.com/qinyudiao/Software-Desgin-Lab-team-project">Take a look at our repo!</a>
        </div>
      );
    }
}

export default About;
