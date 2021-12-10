import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';

import './index.css';

export default function JobEditCard(props) {
    const { action, job, isNew } = props;
    const [jobInfo, setJobInfo] = useState(job == null ? {
        title: "",
        company: "",
        location: "",
        descrption: "",
        email: "",
        website: "",
        postUser: "",
    } : {...job});
    const [titleValidate, setTitleValidate] = useState(true);
    const [companyValidate, setCompanyValidate] = useState(true);
    const [locationValidate, setLocationValidate] = useState(true);
    const [descrptionValidate, setDescrptionValidate] = useState(true);
    const [emailValidate, setEmailValidate] = useState(true);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('api/users/whoIsLoggedIn/')
            .then(response => {
                onChange("postUser", response.data);
            })
    }, "");

    function onChange(key, value) {
        let newJobInfo = { ...jobInfo };
        newJobInfo[key] = value;
        setJobInfo(newJobInfo);
        setTitleValidate(true);
        setCompanyValidate(true);
        setLocationValidate(true);
        setDescrptionValidate(true);
        setEmailValidate(true);
    };

    const handleSubmit = (event, data) => {
        event.preventDefault();
        event.stopPropagation();
        const { title, company, location, descrption, email } = data;
        let valid = true;
        if (title.trim().length === 0) {
            setTitleValidate(false);
            valid = false;
        }
        if (company.trim().length === 0) {
            setCompanyValidate(false);
            valid = false;
        }
        if (location.trim().length === 0) {
            setLocationValidate(false);
            valid = false;
        }
        if (descrption.trim().length === 0) {
            setDescrptionValidate(false);
            valid = false;
        }
        if (email.trim().length === 0) {
            setEmailValidate(false);
            valid = false;
        }
        if (valid) {
            action(data);
        }
    };

    return <Card style={{ borderRadius: "10px", border: "1.5px solid #055160", padding: "30px" }}>
        <Form noValidate onSubmit={(e) => handleSubmit(e, jobInfo)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="text" placeholder="Job Title" value={jobInfo.title} onChange={(e) => onChange("title", e.target.value)} isInvalid={!titleValidate} equired />
                <Form.Control.Feedback type="invalid" validated={titleValidate}>
                    Please input job title
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Company Name" value={jobInfo.company} onChange={(e) => onChange("company", e.target.value)} isInvalid={!companyValidate} required />
                <Form.Control.Feedback type="invalid" validated={false}>
                    Please input company name
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Location" value={jobInfo.location} onChange={(e) => onChange("location", e.target.value)} isInvalid={!locationValidate} required />
                <Form.Control.Feedback type="invalid" validated={false}>
                    Please input location
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" value={jobInfo.email} onChange={(e) => onChange("email", e.target.value)} isInvalid={!emailValidate} required />
                <Form.Control.Feedback type="invalid" validated={false}>
                    Please input email
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                <Form.Label>Website(Optional)</Form.Label>
                <Form.Control type="text" placeholder="Website" value={jobInfo.website} onChange={(e) => onChange("website", e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Descrption</Form.Label>
                <Form.Control as="textarea" rows={3} value={jobInfo.descrption} onChange={(e) => onChange("descrption", e.target.value)} isInvalid={!descrptionValidate} required />
                <Form.Control.Feedback type="invalid" validated={false}>
                    Please input descrption
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="secondary" type="submit">
                {
                    isNew ?
                        "Post New Job"
                        : "Edit"
                }
            </Button>
        </Form>
    </Card>
}
