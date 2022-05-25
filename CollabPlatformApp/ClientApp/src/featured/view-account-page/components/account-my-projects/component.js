import React from 'react';
import Card from 'react-bootstrap/Card';
import {Container} from 'reactstrap';
import { Link } from "react-router-dom";

const MyProjectsComponent = (props) =>{
    const {projects} = props;

    return(
        <div>
            <Container>
                {
                    projects.length !== 0 ? 
                    <div className={"row"}>
                        { 
                            projects.map((project, index) => 
                                <Card className={'projectElement'} key={index}>
                                    <Card.Body>
                                        <Card.Title>
                                            <Link 
                                                to={`/projects/${project.id}`}
                                                className={'projectNameSmall'}>
                                                {project.name}
                                            </Link>
                                        </Card.Title>
                                        <Card.Subtitle 
                                            className="mb-2">
                                                <p className='authorName'>
                                                        Author: <strong>{project.author}</strong>
                                                </p>
                                        </Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted tasksLinksNumText">
                                            Tasks: {project.taskNum} &ensp; Links: {project.linkNum} 
                                            &ensp; Contributors: {project.contributorNum}
                                        </Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            )
                        }
                    </div> 
                    :
                    <div>
                        <h5 className='doNotHave'>You don`t have any projects...</h5>
                    </div>
                }
            </Container>
        </div>
    )
}

export default MyProjectsComponent;