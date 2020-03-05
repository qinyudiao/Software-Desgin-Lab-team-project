import React from 'react';
import Header from './Header';

class Companies extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <h1>Companies</h1>
            </div>
        )
    }
}

export default Companies;