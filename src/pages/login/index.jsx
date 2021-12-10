import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { NavBar } from "../../components";
import './index.css';

export default function LoginPage() {

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    })

    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const onChange = (key, value) => {
        let newUserInfo = { ...userInfo };
        newUserInfo[key] = value;
        setUserInfo(newUserInfo);
        setUsernameErrorMessage("");
        setPasswordErrorMessage("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { username, password } = userInfo;
        let valid = true;
        if (username.trim().length === 0) {
            setUsernameErrorMessage("Please input user name");
            valid = false;
        }
        if (password.trim().length === 0) {
            setPasswordErrorMessage("Please input password");
            valid = false;
        }
        if (valid) {
            axios.defaults.withCredentials = true;
            axios.post('api/users/authenticate', userInfo)
                .then((response) => {
                    if (response.data === "Invalid username or password") {
                        setPasswordErrorMessage("Invalid username or password");
                    } else {
                        window.location.href = "/";
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return <React.Fragment>
        <NavBar />
        <div className="login-area">
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter user name" onChange={(e) => onChange("username", e.target.value)} isInvalid={!!usernameErrorMessage} required />
                    <Form.Control.Feedback type="invalid">
                        {usernameErrorMessage}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" onChange={(e) => onChange("password", e.target.value)} isInvalid={!!passwordErrorMessage} required />
                    <Form.Control.Feedback type="invalid">
                        {passwordErrorMessage}
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="button-wrapper">
                    <Button variant="secondary" type="submit">
                        Login
                    </Button>
                </div>
            </Form>
        </div>
    </React.Fragment >

}