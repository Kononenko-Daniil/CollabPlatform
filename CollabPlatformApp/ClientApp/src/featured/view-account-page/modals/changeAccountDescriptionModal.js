import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ChangeAccountDescriptionModal = (props) => {
    const {
        handleAccountBioChange,
        handleAccountPublicEmailChange,
        handleAccountCompanyChange,
        handleAccountLocationChange,
        handleAccountWebsiteChange,
        handleAccountDescriptionSubmit,
        userBio,
        userPublicEmail,
        userCompany,
        userLocation,
        userWebsite,
        showChangeAccountDescriptionModal,
        handleCloseChangeAccountDescriptionModal,
        OnClearUserDescriptionForm
    } = props;

    return(
        <Modal show={showChangeAccountDescriptionModal} onHide={handleCloseChangeAccountDescriptionModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit account</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleAccountDescriptionSubmit}>
                <Modal.Body>
                    <Form.Control
                        placeholder='Bio'
                        className="inFormElements"
                        as="textarea"
                        value={userBio}
                        id="inputBio"
                        onChange={handleAccountBioChange}
                    />
                    <Form.Control
                        placeholder='Public email'
                        className="inFormElements"
                        type="input"
                        value={userPublicEmail}
                        id="inputPublicEmail"
                        onChange={handleAccountPublicEmailChange}
                    />
                    <Form.Control
                        placeholder='Company'
                        className="inFormElements"
                        type="input"
                        value={userCompany}
                        id="inputCompany"
                        onChange={handleAccountCompanyChange}
                    />
                    <Form.Control
                        placeholder='Location'
                        className="inFormElements"
                        type="input"
                        value={userLocation}
                        id="inputLocation"
                        onChange={handleAccountLocationChange}
                    />
                    <Form.Control
                        placeholder='Website'
                        className="inFormElements"
                        type="input"
                        value={userWebsite}
                        id="inputWebsite"
                        onChange={handleAccountWebsiteChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant={"outline-danger"} 
                        onClick={() => OnClearUserDescriptionForm()}>
                            Clear form
                    </Button>
                    <Button variant={"outline-success"} type={"submit"}>Edit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default ChangeAccountDescriptionModal;