import React, { useState } from "react";

import LinkAddModal from '../../modals/linkAddModal';
import LinkInfoModal from '../../modals/linkInfoModal';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ProjectLinksComponent = (props) => {
    const {
        links,
        handleLinkNameChange,
        handleLinkUrlChange,
        handleLinkSubmit,
        OnClearLinkForm,
        OnDeleteLinkClick,
        linkName,
        linkUrl,
        errorLinkNameMessage,
        errorLinkUrlMessage
    } = props;

    const [showAddLinkModal, setShowAddLinkModal] = useState(false);
    const handleShowAddLinkModal = () => setShowAddLinkModal(true);
    const handleCloseAddLinkModal = () => {
        OnClearLinkForm();
        setShowAddLinkModal(false);
    }

    const [showLinkInfoModal, setShowLinkInfoModal] = useState(false);
    const [linkNameModal, setLinkNameModal] = useState("");
    const [linkUrlModal, setLinkUrlModal] = useState("");
    const handleShowLinkInfoModal = (_linkNameModal, _linkUrlModal) => {
        setLinkNameModal(_linkNameModal);
        setLinkUrlModal(_linkUrlModal);
        setShowLinkInfoModal(true);
    }
    const handleCloseLinkInfoModal = () => {
        setShowLinkInfoModal(false);
    }

    return(
        <div>
            <Button 
                variant={"outline-success"} 
                onClick={handleShowAddLinkModal}>
                    Add links
            </Button>
            {
                links.length !== 0 ?
                    <div>
                        {
                            links.map((link, index) => 
                                <div className='div-row' key={index}>
                                    <Dropdown as={ButtonGroup} className={"linkElement"} >
                                        <Button
                                            variant={"outline-secondary"} 
                                            className={'buutton'}
                                            href={link.url}>
                                            {link.name}
                                        </Button>

                                        <Dropdown.Toggle 
                                            variant={"outline-secondary"} 
                                            id="dropdown-basic" />
                                    
                                        <Dropdown.Menu>
                                            <Dropdown.Item 
                                                onClick={() => handleShowLinkInfoModal(link.name, link.url)}>
                                                    Detail info
                                            </Dropdown.Item>
                                            <Dropdown.Item 
                                                onClick={() => OnDeleteLinkClick(link.id)}>
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

            <LinkInfoModal 
                showLinkInfoModal={showLinkInfoModal}
                handleCloseLinkInfoModal={handleCloseLinkInfoModal}
                linkNameModal={linkNameModal}
                linkUrlModal={linkUrlModal}
                />

            <LinkAddModal 
                showAddLinkModal={showAddLinkModal}
                handleCloseAddLinkModal={handleCloseAddLinkModal}
                handleLinkSubmit={handleLinkSubmit}
                errorLinkNameMessage={errorLinkNameMessage}
                linkName={linkName}
                handleLinkNameChange={handleLinkNameChange}
                errorLinkUrlMessage={errorLinkUrlMessage}
                linkUrl={linkUrl}
                handleLinkUrlChange={handleLinkUrlChange}
                OnClearLinkForm={OnClearLinkForm}
                />
        </div>
    )
}

export default ProjectLinksComponent;