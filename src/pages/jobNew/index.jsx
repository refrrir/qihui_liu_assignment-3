import React from 'react';
import axios from 'axios';
import { NavBar, JobEditCard } from "../../components";
import './index.css';


export default function JobNew() {

    return <React.Fragment>
        <NavBar />
        <div className="jobcreate-area">
            <JobEditCard action={(jobData) => {
                axios.defaults.withCredentials = true;
                axios.post('api/jobs/create', jobData)
                    .then(response => {
                        window.location.href = "./detail/" + response.data._id;
                    })
                    .catch(error => console.log(error));
            }} isNew={true}/>
        </div>
    </React.Fragment >

}