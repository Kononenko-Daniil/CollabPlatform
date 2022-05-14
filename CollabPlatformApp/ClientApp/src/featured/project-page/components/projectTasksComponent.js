import React from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProjectTasksComponent = (props) => {
    const {project, 
        OnDeleteTaskClick, 
        handleShowAddTaskModal } = props;

    return(
        <div>
            <Button 
                variant={"outline-success"} 
                onClick={handleShowAddTaskModal}>
                    Add tasks
            </Button>
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
                                            <Button 
                                                variant='outline-danger' 
                                                onClick={()=>OnDeleteTaskClick(task.id)}>
                                                    Delete
                                            </Button>
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
    )
    
}

export default ProjectTasksComponent;