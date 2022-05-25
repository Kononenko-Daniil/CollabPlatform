import React from 'react';
import { Container } from 'react-bootstrap';

const AccessDeniedComponent = () => {
    return(
        <Container>
            <h1 className={'errorPageName'}>Access denied</h1>
        </Container>
    );
}

export default AccessDeniedComponent