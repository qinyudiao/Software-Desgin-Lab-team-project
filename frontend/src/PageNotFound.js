import React, { Component } from 'react';
import Header from './components/Header.js';
import './css/PageNotFound.css';
import { Redirect } from 'react-router-dom';

class PageNotFound extends Component {
    constructor(props){
        super(props);
        this.state = {
          timeToRedirect: 5
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({timeToRedirect: this.state.timeToRedirect - 1})
        }, 1000)
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.setState({timeToRedirect: this.state.timeToRedirect - 1})
        }, 1000)
    }

    render() {
        return(
            (this.state.timeToRedirect <= 0) ? <Redirect to="/upcoming"/> :
            <React.Fragment>
                <Header/>
                <div className="container">
                    <div className="message">
                        <div className="notification">You will be redirected back to the upcoming launches page in {this.state.timeToRedirect} seconds</div>
                        <div className="number">404</div>
                        <div className="text">Page Not Found</div>
                    </div>
                </div>
            </React.Fragment> 
        );
    }
}

export default PageNotFound;