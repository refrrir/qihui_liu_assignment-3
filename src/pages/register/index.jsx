import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { NavBar } from "../../components";
import './index.css';

export default function RegisterPage() {

    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [passwordRetypeErrorMessage, setPasswordRetypeErrorMessage] = useState("");
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        passwordRetype: "",
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { username, password, passwordRetype } = userInfo;
        let valid = true;
        if (username.trim().length === 0) {
            setUsernameErrorMessage("Please input user name");
            valid = false;
        }
        if (password.trim().length === 0) {
            setPasswordErrorMessage("Please input password");
            valid = false;
        }
        if (passwordRetype.trim().length === 0) {
            setPasswordRetypeErrorMessage("Please retype password");
            valid = false;
        } else if (password.trim().length !== 0 && passwordRetype !== password) {
            setPasswordRetypeErrorMessage("Unmatch password");
            valid = false;
        }
        if (valid) {
            axios.defaults.withCredentials = true;
            axios.post('/users/', userInfo)
                .then(() => {
                    window.location.href="./";
                })
                .catch((error) => {
                    setUsernameErrorMessage("User already exists");
                    console.log(error);
                });
        }
    };

    const onChange = (key, value) => {
        let newUserInfo = { ...userInfo };
        newUserInfo[key] = value;
        setUserInfo(newUserInfo);
        setPasswordErrorMessage("");
        setPasswordRetypeErrorMessage("");
        setUsernameErrorMessage("");
    };

    return <React.Fragment>
        <NavBar />
        <div className="register-area">
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
                    <Form.Control type="password" placeholder="Password" onChange={(e) => onChange("password", e.target.value)} isInvalid={!!passwordErrorMessage} required />
                    <Form.Control.Feedback type="invalid">
                        {passwordErrorMessage}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Retype Password</Form.Label>
                    <Form.Control type="password" placeholder="Retype Password" onChange={(e) => onChange("passwordRetype", e.target.value)} isInvalid={!!passwordRetypeErrorMessage} required />
                    <Form.Control.Feedback type="invalid">
                        {passwordRetypeErrorMessage}
                    </Form.Control.Feedback>
                </Form.Group>


                <div className="button-wrapper">
                    <Button variant="secondary" type="submit">
                        Register
                    </Button>
                </div>
            </Form>
        </div>
    </React.Fragment >

}