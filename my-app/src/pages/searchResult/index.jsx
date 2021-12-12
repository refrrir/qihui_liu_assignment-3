import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NavBar, JobCard } from "../../components";
import './index.css';
import { Alert } from 'react-bootstrap';

export default function SearchResultPage() {
    const { searchQuery } = useParams();
    const [searchResultState, setSearchResultState] = useState([]);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('/api/jobs/findAll/' + searchQuery)
            .then(response => setSearchResultState(response.data))
            .catch(error => console.log(error));
    }, [])

    return <React.Fragment>
        <NavBar />
        <div className="joblist-area">
            {
                searchResultState && searchResultState.length > 0 ?
                    searchResultState.map((item => {
                        return <JobCard jobInfo={item} showAll={false} showHeartButton={false} isLoggedIn={false} />
                    }))
                    : <Alert variant="secondary">
                    No result
                  </Alert>
                
            }
        </div>
    </React.Fragment >

}