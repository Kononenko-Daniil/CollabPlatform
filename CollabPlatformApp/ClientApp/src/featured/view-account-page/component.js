import React, { useState } from 'react';

import { Container } from 'react-bootstrap';
import {NavbarContainer} from '../static-components/navbar/container';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import avatar_2 from '../../img/avatar_2.jpg';
import { MyProjectsContainer } from '../my-projects/container';

const ViewAccountPageComponent = (props) => {
    const {
        user,
        tab
    } = props;

    const [key, setKey] = useState(tab);

    return(
        <div>
            <NavbarContainer/>
            <Container>
                <div className={'row accountView'}>
                    <div className={'col-md-auto avatarPlace'}>
                        <img src={avatar_2} className={'accountImgView'}/>
                        <p className={'userName'}>{user.name}</p>
                        <p className={'smallTextAccount'}><b>{user.projectNum}</b> projects</p>
                    </div>
                    <div className={'col'}>
                        <Tabs 
                            defaultActiveKey="profile" 
                            id="project-tab"
                            className="mb-3" 
                            activeKey={key} 
                            onSelect={(k)=>setKey(k)}>
                                <Tab eventKey="overview" title="Overview">
                                    Here will be useful information about user.
                                </Tab>
                                <Tab eventKey="projects" title="Projects">
                                    <MyProjectsContainer />
                                </Tab>
                        </Tabs>
                    </div>
                </div>
            </Container>
        </div>
    );
}
export default ViewAccountPageComponent;