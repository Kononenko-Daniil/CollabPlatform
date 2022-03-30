import React from 'react';
import { Container } from 'react-bootstrap';

const ProjectPageComponent = (props) => {
    const {project} = props;
    return(
        <Container>
            <h1 className='pageName'>{project.name}</h1>
        </Container>
    )
}

export default ProjectPageComponent;