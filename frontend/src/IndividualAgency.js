import React from 'react';
import Header from './components/Header';
import ec2url from './EC2Link';

class IndividualAgency extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            information: null,
            showInformation: false
        }
    }

    getAgencyInfo = () =>{
        let url = '';

        if(process.env.NODE_ENV === 'production'){
            url = ec2url + 'agency/' + this.props.match.params.agencyId
        }
        else{
            url = '/agency/' + this.props.match.params.agencyId;
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
        this.getAgencyInfo(); 
    }

    render(){
        return(
            <div>
                <Header />
                {this.state.showInformation ? this.state.information.wikiInfo.title : null}
                {this.state.showInformation ? this.state.information.wikiInfo.extract : null}
                {this.state.showInformation ? <a href={this.state.information.wikiInfo.page}>See more information</a> : null}
                {this.state.showInformation ? 
                (
                    this.state.information.wikiInfo.image !== 'Not found' ? <img src={this.state.information.wikiInfo.image} /> : null
                ) 
                : 
                    null
                }
            </div>
        )
    }
}

export default IndividualAgency;