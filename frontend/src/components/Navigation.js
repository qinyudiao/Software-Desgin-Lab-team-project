import React from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import styled from 'styled-components';
import ec2url from '../EC2Link';

const Styles = styled.div`
    .navbar{
        background-color: black;
        display: flex;
        justify-content: space-evenly;
        width: 100vw;
    }

    .navbar-brand{
        color: #e0e0d5;
        font-style: italic;
        font-family: Comic Sans MS, Comic Sans, cursive;
        &:hover {
            color: white;
        }
    }

    .navbar-nav, .nav-link {
        color: white;
        &:hover {
            color: #92f2fc;
        }
    }

    #basic-nav-dropdown {
        color: #d0d2c9;
        font-style: oblique;
        &:hover {
            color: #de6262;
        }
    }

    #search-button {
        color: #c0d1c6;
        font-style: oblique;
    }
`;

// function Navigation(){
class Navigation extends React.Component{
    constructor(props){
        super(props);
        this.state = {}

        this.textInput = React.createRef(); 

    }

    handleChange = () =>{
        const value = this.textInput.current.value;
        // console.log(value);
    }

    // Get search form data and then pass into function to send search to backend
    handleSubmit = (event) =>{
        event.preventDefault();
        const searchTerm = this.textInput.current.value;
        document.getElementById("searchform").reset();
        this.sendSearch(searchTerm); 
        
    }

    // Send post request to backend with user's search
    sendSearch = (search) =>{
        let url = '';
        
        if(process.env.NODE_ENV === 'production'){
            url = ec2url + '/search'
        }
        else{
            url = '/search'
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'search': search})
        };

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
        });
    }


render(){
    return(
        <Styles>
            <Navbar expand="lg">
                <Navbar.Brand href="/">
                    <img alt="" src="/ERLE3.png" width="800" height="60" className="d-inline-block align-top" />
                    {' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav.Item><Nav.Link href="/agency">AGENCIES</Nav.Link></Nav.Item>
                    <NavDropdown title="LAUNCHES">
                        <NavDropdown.Item href="/launch">All Launches</NavDropdown.Item>
                        <NavDropdown.Item href="/upcoming">Upcoming Launches</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="ASTRONAUTS">
                        <NavDropdown.Item href="/USAstronauts">US Astronauts</NavDropdown.Item>
                        <NavDropdown.Item href="/RussianAstronauts">Russian Astronauts</NavDropdown.Item>
                        <NavDropdown.Item href="/InternationalAstronauts">International Astronauts</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item><Nav.Link href="/map">MAP</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/about">ABOUT</Nav.Link></Nav.Item>
                    <NavDropdown title="More" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/fail">Failed Launches</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Manned Launches (phase3)</NavDropdown.Item>
                        <NavDropdown.Item href="education">Education</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Log in (phase3)</NavDropdown.Item>
                    </NavDropdown>
                    <Form inline id="searchform" onSubmit={this.handleSubmit}>
                        <FormControl type="text" name="search" id="search" className="mr-sm-2" placeholder="Search" ref={this.textInput} onChange={this.handleChange} />
                        <Button variant="outline-secondary" id="search-button">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    )
}
}

export default Navigation;
