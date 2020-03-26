import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';

class SubscriberForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            renderCancelButton: false
        }
    }

    sendEmail = (email) =>{
        let url = '';
        if(process.env.NODE_ENV === 'production'){
            url = 'http://ec2-54-226-123-223.compute-1.amazonaws.com/landing/subscribe';
        }
        else{
            url = '/landing/subscribe';
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({'email': email})
        })
        .then(response => console.log(response));
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.sendEmail(event.target.email.value);
    }

    handleOnClick = () =>{
        console.log('goes here')
        this.setState({renderCancelButton: true});
    }

    onClickCancel = () =>{
        document.getElementById("emailForm").reset();
        this.setState({renderCancelButton: false});
    }


    render(){
        return(
            <Form onSubmit={this.handleSubmit} id="emailForm">
                <FormGroup>
                    <h3>Enter your email to get weekly updates about upcoming launches!</h3>
                    <Input type="email" name="email" id="email" placeholder="Enter email here" onClick={this.handleOnClick} />
                    <Button>Submit</Button> 
                    {this.state.renderCancelButton ? (<Button onClick={this.onClickCancel}>Cancel</Button>) : (null)}
                </FormGroup>
            </Form>
        );
    }
}

export default SubscriberForm;