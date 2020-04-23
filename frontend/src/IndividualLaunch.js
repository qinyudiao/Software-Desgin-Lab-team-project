import React from 'react';
import './css/IndividualLaunch.css';
import Header from './components/Header';
import ec2url from './EC2Link';

class IndividualLaunch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            information: null,
            showInformation: false
        }
    }

    getLaunchInfo = () =>{
        let url = '';

        if(process.env.NODE_ENV === 'production'){
            url = ec2url + '/launch/' + this.props.match.params.launchId;
        }
        else{
            url = '/launch/' + this.props.match.params.launchId;
        }
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({information: data});
            this.setState({showInformation: true});
        });
    }

    componentDidMount = () =>{
        this.getLaunchInfo();
    }

    render(){
        return(
            <div className="color-box">
                <Header />
                <h3 align="center">{this.state.showInformation ? this.state.information.name : null}</h3>
                <table>
                <tr>
                <td>
                {this.state.showInformation ?
                (
                    this.state.information.rocketData.imageURL !== 'Not found' ? <img src={this.state.information.rocketData.imageURL} height="300vh" /> : null
                )
                :
                    null
                }
                </td>
                <td valign="top">{this.state.showInformation ?
                (
                    this.state.information.holdreason !== null ? <p> This mission was expected to launch on {this.state.showInformation ? this.state.information.isonet.slice(4,6) : null}/{this.state.showInformation ? this.state.information.isonet.slice(6,8) : null}/{this.state.showInformation ? this.state.information.isonet.slice(0,4) : null}, but it was delayed because {this.state.information.holdreason} </p> : <p> The {this.state.showInformation ? this.state.information.rocketData.name : null} launched from {this.state.showInformation ? this.state.information.locationData.name : null} on {this.state.showInformation ? this.state.information.isonet.slice(4,6) : null}/{this.state.showInformation ? this.state.information.isonet.slice(6,8) : null}/{this.state.showInformation ? this.state.information.isonet.slice(0,4) : null}.</p>
                )
                :
                    null
                }
                {this.state.showInformation ?
                (
                    this.state.information.failreason !== null ? <p> This mission failed due to {this.state.information.failreason} </p> : null
                )
                :
                    null
                }
                {this.state.showInformation ?
                (
                    this.state.information.vidURLs !== null ? <a href={this.state.information.vidURLs}>Watch the launch here</a> : null
                )
                :
                    null
                }
                <br/>
                {this.state.showInformation ? <a href={this.state.information.rocketData.wikiURL}>About the Rocket</a> : null}
                </td>
                </tr>
                </table>
            </div>
        )
    }
}

export default IndividualLaunch;
