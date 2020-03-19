import React from 'react';

class IndividualCompanies extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <div>{this.props.match.params.companyId}</div>
        )
    }
}

export default IndividualCompanies;