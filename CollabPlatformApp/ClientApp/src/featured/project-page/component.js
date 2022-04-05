import React from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ProjectPageComponent = (props) => {
    const {project, handleLinkNameChange, handleLinkUrlChange, handleLinkSubmit} = props;
    return(
        <Container>
            <h1 className='pageName'>{project.name}</h1>
            {
                project.tasks != undefined ?
                    <div className={"row"}>
                        <div className="col">
                            <h4 className={"tasksLinksNameText"}>Tasks</h4>
                                
                            <div className={"row addForm"} style={{margin: 'auto'}}>
                                <div className="col-lg-10">
                                    <Form.Control
                                        placeholder='Task'
                                        className="inFormElements"
                                        type="input"
                                        id="inputTaskText"
                                    />
                                </div>
                                <div className="col-lg-1">
                                    <Button variant='success' className="inFormElements">Add...</Button>
                                </div>
                            </div>
                            {
                                project.tasks.length !== 0 ?
                                <div>
                                    {
                                        project.tasks.map((task, index) => 
                                            <Card className={'taskElement'} key={index}>
                                                <Card.Body>
                                                    <div className={"row"}>
                                                        <div className={"col"}>
                                                            <h6 className={'tasksLinksNameText'} style={{verticalAlign: 'middle'}}>
                                                                {task.text}
                                                            </h6>
                                                        </div>
                                                        <div style={{width: 'auto'}}>
                                                            <Button variant='outline-danger'>Delete</Button>
                                                        </div>
                                                    </div>
                                                    
                                                </Card.Body>
                                            </Card>
                                        )
                                    }  
                                </div>
                                :
                                <div>
                                    <h5 className='doNotHave'>You don`t have any tasks...</h5>
                                </div>
                            }
                        </div>
                        <div className={"col col-lg-5"}>
                            <h4 className={"tasksLinksNameText"}>Links</h4> 
                            <form onSubmit={handleLinkSubmit}>
                                <div className={"row addForm"}>
                                    <div className="col-lg-4">
                                        <Form.Control
                                            placeholder='Link name'
                                            className="inFormElements"
                                            type="input"
                                            id="inputLinlkName"
                                            onChange={handleLinkNameChange}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <Form.Control
                                            placeholder='URL'
                                            className="inFormElements"
                                            type="input"
                                            id="inputLinkURL"
                                            onChange={handleLinkUrlChange}
                                        />
                                    </div>
                                    <div className="col-lg-1">
                                        <Button variant='success' type="submit" className="inFormElements">Add...</Button>
                                    </div>
                                </div>
                            </form>
                            
                            {
                                project.links.map((link, index) => 
                                    <a href={link.url} key={index}>
                                        <Button variant='outline-secondary' className={"linkElement"}>{link.name}</Button>
                                    </a>
                                )
                            } 
                        </div>
                    </div>
                :
                <div>
                    <h5 className='doNotHave'>Loading...</h5>
                </div>
            }
        </Container>
    )
}

export default ProjectPageComponent;