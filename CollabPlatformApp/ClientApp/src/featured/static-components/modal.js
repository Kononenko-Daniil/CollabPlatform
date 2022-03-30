import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Modal = (props) => {
    const {deleteComponentName} = props;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete project</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete project {deleteComponentName}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="Danger" onClick={handleClose}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }

export default Modal;