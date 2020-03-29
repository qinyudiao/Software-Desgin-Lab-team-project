import React from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .navbar{
        background-color: #252525;
        display: flex;
        justify-content: space-evenly;
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

function Navigation(){
 
    return(
        <Styles>
            <Navbar expand="sm">
                <Navbar.Brand href="/">
                    <img alt="" src="/logo512.png" width="28" height="28" className="d-inline-block align-top" />
                    {' '}Every Rocket Launch
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/launch">Launches</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/agency">Agencies</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/astronaut">Astronauts</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/map">Map</Nav.Link></Nav.Item>
                    <NavDropdown title="More" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/fail">Failed Launches</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Manned Launches</NavDropdown.Item>
                        <NavDropdown.Item href="education">Education</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Log in</NavDropdown.Item>
                    </NavDropdown>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-secondary" id="search-button">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    )
}

export default Navigation;

