import React from 'react';
import Header from './components/Header.js';

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                {this.props.location.state.data}
            </div>
        )
    }
}

export default Search; 