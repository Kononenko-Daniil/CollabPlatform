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
                <div class="row">
                    <div class="col" />
                    <div class="col">
                        <h1 className={"pageName"}
                        style={{display:"block",textAlign:"center"}}>
                            Create project
                        </h1>

                        <Form onSubmit={handleProjectSubmit}>
                            <p className="errorFormText">{errorProjectNameMessage}</p>
                            <Form.Control
                                    placeholder='Project title'
                                    value={projectName}
                                    className="inFormElements"
                                    type="input"
                                    id="inputProjectName"
                                    onChange={handleProjectNameChange}
                                />
                            <Button 
                                variant="outline-success" 
                                type="submit"
                                style={{
                                    display:"block", 
                                    marginRight:"auto",
                                    marginLeft:"auto", 
                                    marginTop: "10px"}}>
                                    Create
                            </Button> 
                        </Form>
                    </div>
                    <div class="col" />
                </div>
                
            </Container>
        </div>
    )
} 

export default CreateProjectComponent;