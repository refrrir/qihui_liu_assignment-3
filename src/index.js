import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, SearchResultPage, JobDetailPage, JobEditPage, LoginPage, RegisterPage, JobNewPage, FavoritesPage } from "./pages";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jobSearch/:searchQuery" element={<SearchResultPage />} />
      <Route path="/detail/:jobId" element={<JobDetailPage />} />
      <Route path="/new" element={<JobNewPage />} />
      <Route path="/edit/:jobId" element={<JobEditPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
