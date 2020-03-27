import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import '../css/SubscriberForm.css'

class SubscriberForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            renderCancelButton: false,
        }
    }

    subscribe = (email) =>{
        let url = '';
        if(process.env.NODE_ENV === 'production'){
            url = 'http://ec2-54-226-123-223.compute-1.amazonaws.com/landing/subscribe';
        }
        else{
            url = '/landing/subscribe';
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email})
        };

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.subscribe(event.target.email.value);
        document.getElementById('emailForm').reset();
    }

    handleOnClick = () =>{
        this.setState({renderCancelButton: true});
    }

    onClickCancel = () =>{
        document.getElementById("emailForm").reset();
        this.setState({renderCancelButton: false});
    }


    render(){
        return(
            <Form onSubmit={this.handleSubmit} id="emailForm" className="emailForm">
                <FormGroup>
                    <h3>Subscribe to get weekly updates about upcoming launches!</h3>
                    <Input type="email" name="email" id="email" placeholder="Enter email here" onClick={this.handleOnClick} />
                    <Button>Submit</Button> 
                    {this.state.renderCancelButton ? (<Button onClick={this.onClickCancel}>Cancel</Button>) : (null)}
                </FormGroup>
            </Form>
        );
    }
}

export default SubscriberForm;