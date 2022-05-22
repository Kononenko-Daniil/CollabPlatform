import React, { useState } from 'react';

import ContributorAddModal from '../../modals/contributorAddModal';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import account_base from '../../../../img/account_base.png';

const ProjectContributorsComponent = (props) => {
    const {
        contributors,
        handleContributorNameChange,
        handleContributorSubmit,
        OnClearContributorForm, 
        OnViewContributorClick,
        OnDeleteContributorClick,
        contributorName,
        errorConributorMessage,
    } = props;

    const [showAddContibutorModal, setShowAddContributorModal] = useState(false);
    const handleShowAddContibutorModal = () => setShowAddContributorModal(true);
    const handleCloseAddContibutorModal = () => setShowAddContributorModal(false);

    return (
        <div>
            <Button 
                variant="outline-success" 
                onClick={handleShowAddContibutorModal} 
                style={{marginBottom: "10px"}}>
                    Add contributor
            </Button>
            {
                contributors.length !== 0 ?
                    <div>
                        {
                            contributors.map((contributor, index) => 
                                <div className='div-row' key={index}>
                                    <Dropdown>
                                        <Dropdown.Toggle 
                                            variant={"inline-secondary"} 
                                            className={"contributorElement"} 
                                            id="dropdown-basic">
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
                :
                    <div>
                        <h5 className='doNotHave'>You don`t have any links...</h5>
                    </div>
            }

            <ContributorAddModal 
                showAddContibutorModal={showAddContibutorModal}
                handleCloseAddContibutorModal={handleCloseAddContibutorModal}
                handleContributorSubmit={handleContributorSubmit}
                errorConributorMessage={errorConributorMessage}
                contributorName={contributorName}
                handleContributorNameChange={handleContributorNameChange}
                OnClearContributorForm={OnClearContributorForm}
                />
        </div>
    )
}

export default ProjectContributorsComponent;