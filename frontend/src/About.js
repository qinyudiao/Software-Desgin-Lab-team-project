import React from 'react';
import './css/About.css';
import Header from './components/Header';
import Contributor from './components/Contributor';
import ec2url from './EC2Link';

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
      let url = '';
      if(process.env.NODE_ENV === 'production'){ // Use full url when deployed on AWS
        url = ec2url + '/about';
      }
      else{ // Just use relative url when working on localhost
        url = '/about'
      }

      fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({contributors: data[1]});
        this.setState({issues: data[0]});
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
          "Fullstack and Deployment",
          0
        ],
        'jack': [
          'Jack Diao',
          0,
          0,
          "Fourth Year Electrical & Computer Engineering Major (Software Engineering & Integrated Circuits Tracks) at UT Austin",
          "Fullstack and Deployment",
          0
        ],
        'kenan': [
          'Kenan Hurd',
          0,
          0,
          "Third Year Electrical & Computer Engineering Major (Software Engineering Track) at UT Austin",
          "Frontend",
          0
        ],
        'lucas': [
          'Lucas Best',
          0,
          0,
          "Fourth Year Electrical & Computer Engineering Major (Software Engineering Track) at UT Austin",
          "Backend and Testing",
          20
        ],
        'shawn': [
          'Shawn Victor',
          0,
          0,
          "Fourth Year Electrical & Computer Engineering Major (Embedded Systems & Software Engineering Tracks) at UT Austin",
          "Frontend and Testing",
          5
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
          tests={parent[obj][5]} />
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
          totalIssues += key[1];
        }

        return <p>{totalIssues} total issues</p>
      }

      return(
        <React.Fragment>

        <div width="100vw">
            <Header />
            <div className="flex-container-2">
              <h1 id="about-title">About</h1>
              <div className="gallery-container-2">
              <div className="info-box-2">
                <p>
                  EveryRocketLaunch is a comprehensive database of rocket launches designed to give you as much relevant information
                  as possible about each and every rocket launch.

                  Due to the diverse information available for each rocket launch, this website is designed so that the user can
                  easily navigate to whichever sub-section of information regarding rocket launches they want to look at.

                  Lastly, EveryRocketLaunch is still in development, and our team welcomes any feedback regarding how to make your
                  experience using our site better!
                  </p>
                  </div>
                  <br/>
                <h2>Meet the Team</h2>

              <div className="info-box-2">
              {this.state.githubStats ?
                (<div>
                  {this.state.githubStats}
                  </div>):
                (null)
              }
              </div>

              <br/>
              <h2>Statistics</h2>
              <div className="info-box-2">
                <p>
                {renderTeamCommits()}
                {renderTeamIssues()}
                25 total unit tests</p>
                </div>

                <br/>
              <h2>Data</h2>
              <div className="info-box-2">
              <p>
                <a href="https://www.theguardian.com/news/datablog/2011/jul/08/us-astronauts-listed-nasa#data">Astronauts</a>
                <br/>
                <a href="https://spacefund.com/launch-database/">Companies</a>
                <br/>
                <a href="https://www.rocketlaunch.live/api">Recent Launches</a>
                <br/>
                <a href="https://launchlibrary.net/docs/1.3/api.html">Launches</a>
                </p>
                </div>
                <br/>
              <h2>Tools</h2>
              <div className="info-box-2">
                <p>Frontend built with React, JavaScript, CSS, HTML and Bootstrap
                <br/>Backend built with NodeJS
                <br/>Testing done with Mocha and Selenium
                <br/>Stored data in MongoDB
                <br/>Hosted on Amazon Webservices (Frontend: S3 Backend: EC2)
                <br/>Automatic Deployment with Docker and Travis CI</p>
                </div>
                <br/>
              <a href="https://github.com/qinyudiao/Software-Desgin-Lab-team-project">Take a look at our repo!</a>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
}

export default About;
