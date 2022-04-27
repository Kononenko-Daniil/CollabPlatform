import React from 'react';
import {Container} from 'reactstrap';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';

const CreateProjectComponent = (props) => {
    const {projectName, 
        handleProjectNameChange, 
        handleProjectSubmit, 
        errorProjectNameMessage} = props;

    return(
        <Container>
            <h1 className={"pageName"}>Create project</h1>
            <form  onSubmit={handleProjectSubmit}>
                <p className="errorFormText">{errorProjectNameMessage}</p>
                <Form.Control
                        style={{width: "30% "}} 
                        placeholder='Project name'
                        value={projectName}
                        className="inFormElements"
                        type="input"
                        id="inputProjectName"
                        onChange={handleProjectNameChange}
                    />
                <Button variant="success" type="submit">Create</Button> 
            </form>
        </Container>
    )
} 

export default CreateProjectComponent;