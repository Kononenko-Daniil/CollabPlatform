import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import { Container } from "react-bootstrap";

const SpinnerComponent = (props) => {
    return(
        <Container>
            <div class="row">
                <div class="col" />
                <div class="col">
                    <Spinner animation="border" variant="secondary" className={'loadingSpinner'} />
                </div>
                <div class="col" />
            </div>
        </Container>
    )
}

export default SpinnerComponent;