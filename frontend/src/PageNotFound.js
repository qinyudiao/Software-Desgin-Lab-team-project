import React, { Component } from 'react';
import './css/PageNotFound.css';

class PageNotFound extends Component {
    render() {
        return(
            <div class="container">
                <div class="message">
                    <div class="number">404</div>
                    <div class="text mb-5">Page not found</div>
                </div>
            </div>   
        );
    }
}

export default PageNotFound;