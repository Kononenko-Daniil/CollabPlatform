import React from 'react';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const ProjectContributorsComponent = (props) => {
    const {project, 
        OnDeleteContributorClick,
        handleShowAddContibutorModal} = props;

    return (
        <div>
            
            {
                project.contributors !== undefined ?
                    <div>
                        <Button variant="outline-success" onClick={handleShowAddContibutorModal} style={{marginBottom: "10px"}}>Add contributor</Button>
                        {
                            project.contributors.length !== 0 ?
                                <div>
                                    {
                                        project.contributors.map((contributor, index) => 
                                            <div className='div-row' key={index}>
                                                <Dropdown>
                                                    <OverlayTrigger
                                                        placement={'top'}
                                                        overlay={
                                                            <Tooltip id="email">
                                                                <strong>Email: </strong>{contributor.email}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <Dropdown.Toggle variant={"inline-secondary"} className={"contributorElement"} id="dropdown-basic">
                                                        {contributor.name}
                                                        </Dropdown.Toggle>
                                                    </OverlayTrigger>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>User info</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => OnDeleteContributorClick(contributor.email)}>
                                                            Delete
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        )
                                    }
                                </div>
                            :
                                <div>
                                    <h5 className='doNotHave'>You don`t have any contributors...</h5>
                                </div>
                        }
                    </div>
                :
                    <div>
                        <Spinner animation="border" variant="secondary" className={'loadingSpinner'} />
                    </div>
            }
        </div>
    )
}

export default ProjectContributorsComponent;