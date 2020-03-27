import React from 'react';
import Header from './Header';

class IndividualCompanies extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
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

export default IndividualCompanies;