import React from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

const ProjectTasksComponent = (props) => {
    const {project, 
        handleTaskTextChange, 
        handleTaskSubmit, 
        OnDeleteTaskClick, 
        taskText} = props;

    return(
        <div>
            {
                project.tasks !== undefined ?
                    <div>
                        
                        <form onSubmit={handleTaskSubmit}>
                            <div className={"row addForm"} style={{margin: 'auto'}}>
                                <div className="col">
                                    <Form.Control
                                        placeholder='Task'
                                        value={taskText}
                                        className="inFormElements"
                                        type="input"
                                        id="inputTaskText"
                                        onChange={handleTaskTextChange}
                                    />
                                </div>
                                <div className="col-lg-1">
                                    <Button 
                                        variant='success' 
                                        type="submit" 
                                        className="inFormElements"
                                        style={{width: "fit-content"}}>Add</Button>
                                </div>
                            </div>
                        </form>
                        {
                            project.tasks.length !== 0 ?
                            <div>
                                {
                                    project.tasks.map((task, index) => 
                                        <Card className={'taskElement'} key={index}>
                                            <Card.Body>
                                                <div className={"row"}>
                                                    <div className={"col"} style={{width: "300px"}}>
                                                        <h6 className={'tasksLinksNameText'} >
                                                            {task.text}
                                                        </h6>
                                                    </div>
                                                    <div style={{width: 'auto'}}>
                                                        <Button variant='outline-danger' onClick={()=>OnDeleteTaskClick(task.id)}>Delete</Button>
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
                :
                    <div>
                        <Spinner animation="border" variant="secondary" className={'loadingSpinner'} />
                    </div>
            }
        </div>
    )
    
}

export default ProjectTasksComponent;