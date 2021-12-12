import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

export default function SearchBox() {

    const [searchState, setSearchState] = useState("");
    return <Form className="d-flex">
        <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchState}
            onChange={(e) => { setSearchState(e.target.value); }}
        />
        <Button variant="outline-secondary"
            onClick={() => {
                if (!searchState.trim().length == 0) {
                    window.location.href = "/jobSearch/" + searchState;
                }
            }}
            onKeyUp={(e) => {
                e.preventDefault();
                if (e.key === "13") {
                    if (!searchState.trim().length == 0) {
                        window.location.href = "/jobSearch/" + searchState;
                    }
                }
            }}
        >Search</Button>
    </Form>
}