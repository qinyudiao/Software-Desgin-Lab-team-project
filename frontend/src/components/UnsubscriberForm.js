import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';

class UnsubscriberForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            renderCancelButton: false,
        }
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
        .then(data => console.log(data))
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.unsubscribe(event.target.email.value);
        document.getElementById("unsubscribeForm").reset();
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
                    <Input type="email" name="email" id="email" placeholder="Enter email here" onClick={this.handleOnClick} />
                    <Button>Submit</Button> 
                    {this.state.renderCancelButton ? (<Button onClick={this.onClickCancel}>Cancel</Button>) : (null)}
                </FormGroup>
            </Form>
        );
    }
}

export default UnsubscriberForm;