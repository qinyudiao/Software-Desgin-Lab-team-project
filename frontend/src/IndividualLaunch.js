import React from 'react';
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
            url = ec2url + 'launch/' + this.props.match.params.launchId;
        }
        else{
            url = 'https://localhost:8080/launch/' + this.props.match.params.launchId;
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
            <div>
                <Header />
                {this.state.showInformation ? this.state.information.name : null}
                {this.state.showInformation ? this.state.information.locationData.name : null}
                {this.state.showInformation ? this.state.information.rocketData.name : null}
            </div>
        )
    }
}

export default IndividualLaunch;
