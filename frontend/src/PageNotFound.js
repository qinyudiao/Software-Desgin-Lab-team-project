import React, { Component } from 'react';
import Header from './Header.js';
import './css/PageNotFound.css';

class PageNotFound extends Component {
    render() {
        return(
            <React.Fragment>
                <Header/>
                <div class="container">
                    <div class="message">
                        <div class="number">404</div>
                        <div class="text">Page Not Found</div>
                    </div>
                </div>
            </React.Fragment> 
        );
    }
}

export default PageNotFound;