import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const TaskAddModal = (props) => {
    const {
        showAddTaskModal,
        handleCloseAddTaskModal,
        handleTaskSubmit,
        handleTaskTextChange,
        OnClearTaskForm,
        errorTaskTextMessage,
        taskText,
    } = props;

    return(
        <Modal show={showAddTaskModal} onHide={handleCloseAddTaskModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add task</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleTaskSubmit}>
                <Modal.Body>
                    <p className="errorFormText">{errorTaskTextMessage}</p>
                    <Form.Control
                        placeholder='Task'
                        value={taskText}
                        className="inFormElements"
                        as="textarea"
                        id="inputTaskText"
                        onChange={handleTaskTextChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"outline-danger"} onClick={() => OnClearTaskForm()}>Clear form</Button>
                    <Button variant={"outline-success"} type={"submit"}>Add task</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default TaskAddModal;