import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteProjectModal = (props) => {
    const {
        showDeleteProjectModal,
        projectName,
        handleAcceptDelete,
        handleCloseDeleteModal
    } = props;

    return(
        <Modal show={showDeleteProjectModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
                <Modal.Title>Deleting project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete {projectName}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseDeleteModal}>
                    Cancel
                </Button>
                <Button variant="outline-danger" onClick={handleAcceptDelete}>
                    Delete project
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteProjectModal;