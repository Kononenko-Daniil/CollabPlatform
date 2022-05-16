import React from 'react';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import account_base from '../../../img/account_base.png';

const ProjectContributorsComponent = (props) => {
    const {project, 
        OnDeleteContributorClick,
        OnViewContributorClick,
        handleShowAddContibutorModal} = props;

    return (
        <div>
            <Button 
                variant="outline-success" 
                onClick={handleShowAddContibutorModal} 
                style={{marginBottom: "10px"}}>
                    Add contributor
            </Button>
            <div>
                {
                    project.contributors.map((contributor, index) => 
                        <div className='div-row' key={index}>
                            <Dropdown>
                                <Dropdown.Toggle variant={"inline-secondary"} className={"contributorElement"} id="dropdown-basic">
                                    <img src={account_base} className={'accountBaseImg'} alt="account"></img>
                                    {contributor.name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => OnViewContributorClick(contributor.name)}>
                                        User info
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => OnDeleteContributorClick(contributor.name)}>
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProjectContributorsComponent;