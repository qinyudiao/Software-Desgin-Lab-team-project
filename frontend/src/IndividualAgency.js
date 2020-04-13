import React from 'react';
import Header from './components/Header';
import ec2url from './EC2Link';

class IndividualAgency extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    getAgencyInfo = () =>{
        let url = '';

        if(process.env.NODE_ENV === 'production'){
            url = ec2url + 'agency/:' + this.props.match.params.agencyId
        }
        else{
            url = '/agency/:' + this.props.match.params.agencyId;
        }
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
    }

    render(){
        return(
            <div>
                <Header />
                {this.props.match.params.companyId}
            </div>
        )
    }
}

export default IndividualAgency;