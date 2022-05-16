import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const LinkInfoModal = (props) => {
    const {
        showLinkInfoModal,
        handleCloseLinkInfoModal,
        linkNameModal,
        linkUrlModal
    } = props;

    return(
        <Modal show={showLinkInfoModal} onHide={handleCloseLinkInfoModal}>
            <Modal.Header closeButton>
                <Modal.Title>Link info</Modal.Title>
            </Modal.Header>
            <Modal.Body>Name: {linkNameModal} &ensp; URL: {linkUrlModal}</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseLinkInfoModal}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LinkInfoModal;