import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ContributorAddModal = (props) => {
    const {
        showAddContibutorModal,
        handleCloseAddContibutorModal,
        handleContributorSubmit,
        errorConributorMessage,
        contributorName,
        handleContributorNameChange,
        OnClearContributorForm
    } = props;

    return(
        <Modal show={showAddContibutorModal} onHide={handleCloseAddContibutorModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add contributor</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleContributorSubmit}>
                <Modal.Body>
                    <p className="errorFormText">{errorConributorMessage}</p>
                    <Form.Control
                        placeholder='User name'
                        className="inFormElements"
                        type="input"
                        value={contributorName}
                        id="inputContributorName"
                        onChange={handleContributorNameChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"outline-danger"} onClick={() => OnClearContributorForm()}>Clear form</Button>
                    <Button variant={"outline-success"} type={"submit"}>Add contributor</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default ContributorAddModal;