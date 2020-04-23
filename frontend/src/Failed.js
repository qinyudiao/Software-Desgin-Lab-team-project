import React from 'react';
import Header from './components/Header.js';
import ReactPlayer from 'react-player';

class Failed extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <ReactPlayer width="100vw" height="100vh" url="https://www.youtube.com/watch?v=Z99pGVDZhaY&t=166s"/>
            </div>
        )
    }
}

export default Failed;
