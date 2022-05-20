import React from 'react';
import { Container } from 'react-bootstrap';
import access_denied from '../../../img/access-denied.png';

const AccessDeniedComponent = () => {
    return(
        <Container>
            <h1 className={'errorPageName'}>Access denied</h1>
            
        </Container>
    );
}

export default AccessDeniedComponent