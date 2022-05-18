import React from 'react';
import {Container} from 'reactstrap';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import {NavbarContainer} from '../static-components/navbar/container';

const CreateProjectComponent = (props) => {
    const{projectName, 
        handleProjectNameChange, 
        handleProjectSubmit, 
        errorProjectNameMessage} = props;

    return(
        <div>
            <NavbarContainer />
            <Container>
                <h1 className={"pageName"}>Create project</h1>
                <form  onSubmit={handleProjectSubmit}>
                    <p className="errorFormText">{errorProjectNameMessage}</p>
                    <Form.Control
                            style={{width: "30% "}} 
                            placeholder='Project title'
                            value={projectName}
                            className="inFormElements"
                            type="input"
                            id="inputProjectName"
                            onChange={handleProjectNameChange}
                        />
                    <Button variant="success" type="submit">Create</Button> 
                </form>
            </Container>
        </div>
    )
} 

export default CreateProjectComponent;