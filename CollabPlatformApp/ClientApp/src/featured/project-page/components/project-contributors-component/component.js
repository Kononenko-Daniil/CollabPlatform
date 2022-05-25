import React, { useState } from 'react';

import ContributorAddModal from '../../modals/contributorAddModal';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ProjectContributorsComponent = (props) => {
    const {
        contributors,
        handleContributorNameChange,
        handleContributorSubmit,
        OnClearContributorForm, 
        OnDeleteContributorClick,
        contributorName,
        errorConributorMessage,
    } = props;

    const [showAddContibutorModal, setShowAddContributorModal] = useState(false);
    const handleShowAddContibutorModal = () => setShowAddContributorModal(true);
    const handleCloseAddContibutorModal = () => { 
        OnClearContributorForm();
        setShowAddContributorModal(false);
    }

    return (
        <div>
            <Button 
                variant="outline-success" 
                onClick={handleShowAddContibutorModal} 
                className={'buutton'}
                style={{marginBottom: "10px",outline:"none"}}>
                    Add contributor
            </Button>
            {
                contributors.length !== 0 ?
                    <div>
                        {
                            contributors.map((contributor, index) => 
                                <div className='div-row' key={index}>
                                    <Dropdown as={ButtonGroup} className={'contributorElement'}>
                                        <Button
                                            variant={"outline-dark"} 
                                            className={'buutton'}
                                            href={`/accounts/${contributor.name}/overview`}>
                                            {contributor.name}
                                        </Button>
                                        <Dropdown.Toggle split variant="outline-dark" id="dropdown-basic" />
                                        <Dropdown.Menu>
                                            <Dropdown.Item 
                                                onClick={() => OnDeleteContributorClick(contributor.name)}>
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