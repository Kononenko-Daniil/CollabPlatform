import React from 'react';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';

const ProjectContributorsComponent = (props) => {
    const {handleShowAddContibutorModal} = props;

    return (
        <div>
            <Button variant="outline-success" onClick={handleShowAddContibutorModal}>Add contributor</Button>
        </div>
    )
}

export default ProjectContributorsComponent;