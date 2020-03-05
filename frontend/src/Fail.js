import React from 'react';
<<<<<<< HEAD
import NavBar from './NavBar.js';
import ReactPlayer from 'react-player'; 
=======
import Header from './Header.js';
>>>>>>> b98c5bfccccced3591e12fdb51c5da8ac0c177ee

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