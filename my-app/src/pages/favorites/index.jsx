import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavBar, JobCard } from "../../components";
import './index.css';

export default function FavoritesPage() {
    const [favoritesState, setfavoritesState] = useState([]);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('/api/users/favorites')
            .then(response => setfavoritesState(response.data))
            .catch(error => console.log(error));
    }, [])

    return <React.Fragment>
        <NavBar />
        <div className="joblist-area">
            {
                favoritesState.map((item => {
                    return <JobCard jobInfo={item} showAll={false} isLoggedIn={false} showHeartButton={false} />
                }))
            }
        </div>
    </React.Fragment >

}