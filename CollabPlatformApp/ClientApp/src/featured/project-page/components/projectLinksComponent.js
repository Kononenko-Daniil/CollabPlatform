import React from "react";

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

const ProjectLinksComponent = (props) => {
    const {project, 
        OnDeleteLinkClick, 
        handleShowLinkInfoModal, 
        handleShowAddLinkModal} = props;

    return(
        <div>
            <Button 
                variant={"outline-success"} 
                onClick={handleShowAddLinkModal}>
                    Add links
            </Button>
            {
                project.links.length !== 0 ?
                    <div>
                        {
                            project.links.map((link, index) => 
                                <div className='div-row' key={index}>
                                    <Dropdown>
                                        <Dropdown.Toggle 
                                            variant={"inline-secondary"} 
                                            className={"linkElement"} 
                                            id="dropdown-basic">
                                        {link.name}
                                        </Dropdown.Toggle>
                                    
                                        <Dropdown.Menu>
                                            <Dropdown.Item href={link.url}>Open</Dropdown.Item>
                                            <Dropdown.Item 
                                                onClick={() => OnDeleteLinkClick(link.id)}>
                                                    Delete
                                            </Dropdown.Item>
                                            <Dropdown.Item 
                                                onClick={() => handleShowLinkInfoModal(link.name, link.url)}>
                                                    Detail info
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
        </div>
    )
}

export default ProjectLinksComponent;