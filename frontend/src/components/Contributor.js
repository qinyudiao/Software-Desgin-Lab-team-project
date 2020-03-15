import React from 'react';

class Contributor extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <div>
                <h3>{this.props.name}</h3>
                <img alt="contributor headshot" src={this.props.src}></img>
                <p>{this.props.commits} commits</p>
                <p>{this.props.issues} issues</p>
            </div>

        );
    }
}

export default Contributor;