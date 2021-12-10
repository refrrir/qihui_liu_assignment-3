import axios from 'axios';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { HeartButton } from '../../components';

import './index.css';

export default function JobCard(props) {
    const { showAll, jobInfo, isLoggedIn, editable, showHeartButton } = props;
    const { _id, title, company, location, descrption, email, website, postingDate } = jobInfo;
    const date = new Date(postingDate);
    return <Card style={{ borderRadius: "10px", border: "1.5px solid #055160" }}>
        <Card.Body>
            <Card.Title onClick={() => { if (!showAll) window.location.href = "../detail/" + _id }}>
                <span>{title}</span>
                {(showHeartButton && !!_id) && <HeartButton jobId={_id} isLoggedIn={isLoggedIn} />}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{location}</Card.Subtitle>
            <Card.Subtitle>{company}</Card.Subtitle>
            {
                showAll && <React.Fragment>
                    <Card.Text className="card-descrption">
                        {descrption}
                    </Card.Text>
                    <Card.Text>
                        <a href={"mailto:" + email}>Email</a>
                    </Card.Text>
                    {website && <Card.Text>
                        {company}
                    </Card.Text>}
                    <Card.Subtitle className="mb-2 text-muted">{"Posted on " + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()}</Card.Subtitle>
                    {editable && <div style={{ marginTop: "20px" }}>
                        <Button variant="secondary" type="submit" style={{ marginRight: "10px" }} onClick={() => window.location.href = "../edit/" + _id}>
                            Edit
                        </Button>
                        <Button variant="danger" type="submit" onClick={() => {
                            axios.delete('api/jobs/delete/' + _id)
                                .then(() => {
                                    window.location.href = "/";
                                })
                                .catch(error => console.log(error));
                        }}>
                            Delete
                        </Button>
                    </ div>
                    }
                </React.Fragment>
            }
        </Card.Body>
    </Card >
}
