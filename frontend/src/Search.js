import React from 'react';
import Header from './components/Header.js';

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount = () =>{
        console.log(this.props.location.state);
    }

    render(){
        return(
            <div>
                <Header />
                <p>search</p>
            </div>
        )
    }
}

export default Search; 