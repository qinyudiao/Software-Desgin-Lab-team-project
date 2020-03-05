import React from 'react';
import Header from './Header.js';
import ReactPlayer from 'react-player'; 

class Fail extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <h1>Fail</h1> 
                <ReactPlayer url="https://www.youtube.com/watch?v=Z99pGVDZhaY&t=166s"/>
            </div>
        )
    }
}

export default Fail; 