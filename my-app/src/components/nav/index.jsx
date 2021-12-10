import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import './index.css';

export default function NavBar() {

    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('/users/whoIsLoggedIn/')
            .then(response => {
                console.log(response.data);
                setUsername(response.data);
                setIsLoggedIn(true);
            })
            .catch(() => setIsLoggedIn(false));
    }, "");


    return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">Job Board</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>
                    {isLoggedIn ?
                        <Nav.Link onClick={() => {
                            axios.get('/users/logout')
                            .then(() => {
                                setUsername("");
                                setIsLoggedIn(false);
                                window.location.reload();
                            })
                            .catch(() => setIsLoggedIn(false));
                        }}>Log out</Nav.Link>
                        : <React.Fragment>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </React.Fragment>
                    }
                    {
                        isLoggedIn && <Navbar.Collapse id="navbar-example">
                            <Nav>
                                <NavDropdown
                                    id="nav-dropdown-example"
                                    title={username}
                                >
                                    <NavDropdown.Item href="../favorites">favorites</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    }
                    {
                        isLoggedIn && <Button variant="danger" style={{ marginLeft: "20px" }} onClick={() => { window.location.href = "../new" }}>Post Job</Button>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}