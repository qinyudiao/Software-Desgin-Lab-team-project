import React from 'react';
import {Button, Form, FormGroup, Input, FormFeedback} from 'reactstrap';

class UnsubscriberForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            renderCancelButton: false,
            renderFail: false,
            renderSuccess: false,
            renderGreen: false,
            renderRed: false
        }
    }

    hideSuccess = () =>{
        this.setState({renderSuccess: false});
        this.setState({renderGreen: false});
    }

    hideFail = () =>{
        this.setState({renderFail: false});
        this.setState({renderRed: false});
    }

    unsubscribe = (email) =>{
        let url = '';
        if(process.env.NODE_ENV === 'production'){
            url = 'http://ec2-54-226-123-223.compute-1.amazonaws.com/landing/unsubscribe';
        }
        else{
            url = '/landing/unsubscribe';
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email})
        };

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data['message']);
            if(data['message'] === 'success'){
                this.setState({renderSuccess: true});
                this.setState({renderGreen: true});
                setTimeout(this.hideSuccess, 2000);
            }
            else if(data['message'] === 'fail'){
                this.setState({renderFail: true});
                this.setState({renderRed: true});
                setTimeout(this.hideFail, 2000);
            }
        });
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.unsubscribe(event.target.email.value);
        document.getElementById("unsubscribeForm").reset();
        this.setState({renderCancelButton: false});
    }

    handleOnClick = () =>{
        this.setState({renderCancelButton: true});
    }

    onClickCancel = () =>{
        document.getElementById("unsubscribeForm").reset();
        this.setState({renderCancelButton: false});
    }


    render(){
        return(
            <Form onSubmit={this.handleSubmit} id="unsubscribeForm" className="emailForm">
                <FormGroup>
                    <h3>Unsubscribe from our weekly newsletter about upcoming launches!</h3>
                    <Input invalid={this.state.renderRed} valid={this.state.renderGreen} type="email" name="email" id="email" placeholder="Enter email here" onClick={this.handleOnClick} />
                    {this.state.renderSuccess ? (<FormFeedback valid>You have been removed as a subscriber!</FormFeedback>) : (null)}
                    {this.state.renderFail ? (<FormFeedback>You are not a subscriber!</FormFeedback>) : (null)}
                    <Button>Submit</Button> 
                    {this.state.renderCancelButton ? (<Button onClick={this.onClickCancel}>Cancel</Button>) : (null)}
                </FormGroup>
            </Form>
        );
    }
}

export default UnsubscriberForm;