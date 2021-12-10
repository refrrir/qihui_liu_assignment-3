import React from 'react';
import { SearchBox, NavBar } from "../../components";
import './index.css';

export default function HomePage() {

    return <React.Fragment>
        <NavBar />
        <div className="search-area">
            <div className="search-logo-container">
                <div className="search-logo" />
            </div>
            <div className="search-container">
                <SearchBox />
            </div>
        </div>
    </React.Fragment >

}