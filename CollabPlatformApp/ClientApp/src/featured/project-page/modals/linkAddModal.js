import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LinkAddModal = (props) => {
    const {
        showAddLinkModal,
        handleCloseAddLinkModal,
        handleLinkSubmit,
        errorLinkNameMessage,
        linkName,
        handleLinkNameChange,
        errorLinkUrlMessage,
        linkUrl,
        handleLinkUrlChange,
        OnClearLinkForm
    } = props;

    return(
        <Modal show={showAddLinkModal} onHide={handleCloseAddLinkModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add link</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleLinkSubmit}>
                <Modal.Body>
                    <p className="errorFormText">{errorLinkNameMessage}</p>
                    <Form.Control
                        placeholder='Link name'
                        className="inFormElements"
                        type="input"
                        value={linkName}
                        id="inputLinkName"
                        onChange={handleLinkNameChange}
                    />
                    <p className="errorFormText">{errorLinkUrlMessage}</p>
                    <Form.Control
                        placeholder='URL'
                        className="inFormElements"
                        as="textarea"
                        value={linkUrl}
                        id="inputLinkURL"
                        onChange={handleLinkUrlChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"outline-danger"} onClick={() => OnClearLinkForm()}>Clear form</Button>
                    <Button variant={"outline-success"} type={"submit"}>Add link</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default LinkAddModal;