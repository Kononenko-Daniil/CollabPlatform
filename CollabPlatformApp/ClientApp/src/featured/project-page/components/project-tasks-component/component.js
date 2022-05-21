import React, { useState } from "react";

import TaskAddModal from "../../modals/taskAddModal";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProjectTasksComponent = (props) => {
    const { 
        tasks,
        handleTaskTextChange,
        handleTaskSubmit, 
        OnClearTaskForm,
        OnDeleteTaskClick,
        taskText, 
        errorTaskTextMessage 
    } = props;

    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const handleShowAddTaskModal = () => setShowAddTaskModal(true);
    const handleCloseAddTaskModal = () => setShowAddTaskModal(false);

    return(
        <div>
            <Button 
                variant={"outline-success"} 
                onClick={handleShowAddTaskModal}>
                    Add tasks
            </Button>
            {
                tasks.length !== 0 ?
                <div>
                    {
                        tasks.map((task, index) => 
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

            <TaskAddModal 
                showAddTaskModal={showAddTaskModal}
                handleCloseAddTaskModal={handleCloseAddTaskModal}
                handleTaskTextChange={handleTaskTextChange}
                handleTaskSubmit={handleTaskSubmit}
                OnClearTaskForm={OnClearTaskForm}
                errorTaskTextMessage={errorTaskTextMessage}
                taskText={taskText}
                />
        </div>
    )
    
}

export default ProjectTasksComponent;