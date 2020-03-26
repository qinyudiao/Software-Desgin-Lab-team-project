import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

class SubscriberForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            renderCancelButton: false
        }
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        console.log(event.target.email.value);
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