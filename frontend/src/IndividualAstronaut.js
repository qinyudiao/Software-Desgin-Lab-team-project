import React from 'react';
import Header from './Header.js';

class IndividualAstronaut extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            temp: null
        }
    }

    componentDidMount(){
        this.setState({temp: this.props.match.params.astronautId});
        console.log(this.props.match.params);
    }

    render(){
        return(
            <div>
                <Header />
                <p>{this.state.temp}</p>
                <p>does this show after deployment with travis</p>
            </div>
        )
    }
    
}

export default IndividualAstronaut;