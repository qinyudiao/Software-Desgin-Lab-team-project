import React from 'react';
import Header from './Header.js';

class Country extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: null

        }
    }

    getCountry = () =>{
        let url = '';
        if(process.env.NODE_ENV == 'production'){
            url = 'http://ec2-54-226-123-223.compute-1.amazonaws.com/country';
        }
        else{
            url = '/country'
        }
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({data});
        })
    }

    componentDidMount(){
        this.getCountry();
    }

    render(){
        return(
            <div>
                <Header />
                <h1>Country</h1>
                <p>{this.state.data}</p>
            </div>
        )
    }
}

export default Country;