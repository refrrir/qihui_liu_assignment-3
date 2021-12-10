import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NavBar, JobCard } from "../../components";
import './index.css';


export default function JobDetail() {
    const { jobId } = useParams();
    const [jobInfo, setJobInfo] = useState({
        title: "",
        company: "",
        location: "",
        descrption: "",
        email: "",
        website: "",
        postUser: "",
    });
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('/jobs/find/' + jobId)
            .then(response => setJobInfo(response.data[0]))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('/users/whoIsLoggedIn/')
            .then(response => {
                setUsername(response.data);
                setIsLoggedIn(true);
            })
            .catch(() => setIsLoggedIn(false));
    }, "");

    return <React.Fragment>
        <NavBar />
        <div className="jobdetail-area">
            <JobCard jobInfo={jobInfo} showAll={true} isLoggedIn={isLoggedIn} showHeartButton={true} editable={jobInfo.postUser === username} />
        </div>
    </React.Fragment >

}