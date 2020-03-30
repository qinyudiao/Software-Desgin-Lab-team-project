import React, { Component } from 'react';
import Header from './components/Header.js';
import './css/PageNotFound.css';
import { Redirect } from 'react-router-dom';

class PageNotFound extends Component {
    constructor(props){
        super(props);
        this.state = {
          isTimedUp: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isTimedUp: true})
        }, 5000)
    }

    render() {
        return(
            (this.state.isTimedUp === true) ? <Redirect to="/"/> :
            <React.Fragment>
                <Header/>
                <div class="container">
                    <div class="message">
                        <div class="notification">You will be redirected back to the home page in 5 seconds</div>
                        <div class="number">404</div>
                        <div class="text">Page Not Found</div>
                    </div>
                </div>
            </React.Fragment> 
        );
    }
}

export default PageNotFound;