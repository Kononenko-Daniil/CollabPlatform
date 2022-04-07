import React from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';

const ProjectLinksComponent = (props) => {
    const {project, 
        handleLinkNameChange, 
        handleLinkUrlChange, 
        handleLinkSubmit, 
        OnDeleteLinkClick, 
        linkName, 
        linkUrl, 
        handleShowLinkInfoModal} = props;

    return(
        <div>
            {
                project.links !== undefined ?
                    <div>
                        <form onSubmit={handleLinkSubmit}>
                            <div className={"row addForm"}>
                                <div className="col">
                                    <Form.Control
                                        placeholder='Link name'
                                        className="inFormElements"
                                        type="input"
                                        value={linkName}
                                        id="inputLinlkName"
                                        onChange={handleLinkNameChange}
                                    />
                                </div>
                                <div className="col">
                                    <Form.Control
                                        placeholder='URL'
                                        className="inFormElements"
                                        type="input"
                                        value={linkUrl}
                                        id="inputLinkURL"
                                        onChange={handleLinkUrlChange}
                                    />
                                </div>
                                <div className="col-lg-1">
                                    <Button variant='success' type="submit" className="inFormElements">Add</Button>
                                </div>
                            </div>
                        </form>
                        {
                            project.links.length !== 0 ?
                                <div>
                                    {
                                        project.links.map((link, index) => 
                                            <div className='div-row' key={index}>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant={"inline-secondary"} className={"linkElement"} id="dropdown-basic">
                                                    {link.name}
                                                    </Dropdown.Toggle>
                                                
                                                    <Dropdown.Menu>
                                                    <Dropdown.Item href={link.url}>Open</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => OnDeleteLinkClick(link.id)}>Delete</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleShowLinkInfoModal(link.name, link.url)}>Detail info</Dropdown.Item>
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
                :
                    <div>
                        <Spinner animation="border" variant="secondary" className={'loadingSpinner'} />
                    </div>
            }
        </div>
    )
}

export default ProjectLinksComponent;