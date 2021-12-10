import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NavBar, JobEditCard } from "../../components";
import './index.css';


export default function JobEdit() {
    const { jobId } = useParams();
    const [jobInfo, setJobInfo] = useState({
        _id: "",
        title: "",
        company: "",
        location: "",
        descrption: "",
        email: "",
        website: "",
        postUser: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('api/jobs/find/' + jobId)
            .then(response => {
                setJobInfo(response.data[0]);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, []);

    return <React.Fragment>
        <NavBar />
        <div className="jobcreate-area">
            {!isLoading && <JobEditCard action={(jobData) => {
                axios.defaults.withCredentials = true;
                axios.put('api/jobs/edit', jobData)
                    .then(() => {
                        window.location.href = "../detail/" + jobData._id;
                    })
                    .catch(error => console.log(error));
            }} job={jobInfo} isNew={false} />}
        </div>
    </React.Fragment >

}