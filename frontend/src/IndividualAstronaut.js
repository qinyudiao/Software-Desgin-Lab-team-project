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
                <p> astronaut individual page</p>
                <p>{this.state.temp}</p>
            </div>
        )
    }
    
}

export default IndividualAstronaut;