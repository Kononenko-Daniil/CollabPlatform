import React, { useState } from 'react';

import { Container } from 'react-bootstrap';
import {NavbarContainer} from '../static-components/navbar/container';
import ChangeAccountDescriptionModal from './modals/changeAccountDescriptionModal';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import avatar_2 from '../../img/avatar_2.jpg';
import { MyProjectsContainer } from './components/account-my-projects/container';
import email from '../../img/email.png';
import company from '../../img/company.png';
import location from '../../img/location.png';
import website from '../../img/website.png';

const ViewAccountPageComponent = (props) => {
    const {
        user,
        tab,
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
        OnClearUserDescriptionForm,
        initDescriptionEditModal
    } = props;

    const [key, setKey] = useState(tab);

    const [showChangeAccountDescriptionModal, setShowChangeAccountDescriptionModal] = useState(false);
    const handleShowChangeAccountDescriptionModal = () => {
        setShowChangeAccountDescriptionModal(true);
        initDescriptionEditModal();
    }
    const handleCloseChangeAccountDescriptionModal = () => setShowChangeAccountDescriptionModal(false);

    return(
        <div>
            <NavbarContainer/>
            <Container>
                <div className={'row accountView'}>
                    <div className={'col-md-auto avatarPlace'}>
                        <img src={avatar_2} className={'accountImgView'}/>
                        <p className={'userName'}>{user.name}</p>
                        <p className={'smallTextAccount'}><b>{user.projectNum}</b> projects</p>
                        <Button 
                            variant={'outline-dark'}
                            style={{width: "100%", marginBottom: "10px"}}
                            onClick={handleShowChangeAccountDescriptionModal}>
                                Edit account
                        </Button>
                        {
                            user.bio != "" ? 
                                <h5 className='userDescriptionText'>{user.bio}</h5>
                            : <span/>
                        }
                        {
                            user.publicEmail != "" ? 
                                <h5 className='userSmallDescriptionText'>
                                    <img src={email} className={'descriptionSign'}/>
                                    &ensp; {user.publicEmail}
                                </h5>
                            : <span/>
                        }
                        {
                            user.company != "" ? 
                                <h5 className='userSmallDescriptionText'>
                                    <img src={company} className={'descriptionSign'}/>
                                    &ensp; {user.company}
                                </h5>
                            : <span/>
                        }
                        {
                            user.location != "" ? 
                                <h5 className='userSmallDescriptionText'>
                                    <img src={location} className={'descriptionSign'}/>
                                    &ensp; {user.location}
                                </h5>
                            : <span/>
                        }
                        {
                            user.website != "" ? 
                                <h5 className='userSmallDescriptionText'>
                                    <img src={website} className={'descriptionSign'} />
                                    &ensp; {user.website}
                                </h5>
                            : <span/>
                        }
                        
                    </div>
                    <div className={'col'}>
                        <Tabs 
                            defaultActiveKey="profile" 
                            id="project-tab"
                            className="mb-3" 
                            activeKey={key} 
                            onSelect={(k)=>setKey(k)}
                            style={{marginTop: "20px"}}>
                                <Tab eventKey="overview" title="Overview">
                                    Here will be user statistics
                                </Tab>
                                <Tab eventKey="projects" title="Projects">
                                    <MyProjectsContainer 
                                        userName={user.name}
                                        />
                                </Tab>
                        </Tabs>
                    </div>
                </div>

                <ChangeAccountDescriptionModal 
                    handleAccountBioChange={handleAccountBioChange}
                    handleAccountPublicEmailChange={handleAccountPublicEmailChange}
                    handleAccountCompanyChange={handleAccountCompanyChange}
                    handleAccountLocationChange={handleAccountLocationChange}
                    handleAccountWebsiteChange={handleAccountWebsiteChange}
                    handleAccountDescriptionSubmit={handleAccountDescriptionSubmit}
                    userBio={userBio}
                    userPublicEmail={userPublicEmail}
                    userCompany={userCompany}
                    userLocation={userLocation}
                    userWebsite={userWebsite}
                    showChangeAccountDescriptionModal={showChangeAccountDescriptionModal}
                    handleCloseChangeAccountDescriptionModal={handleCloseChangeAccountDescriptionModal}
                    OnClearUserDescriptionForm={OnClearUserDescriptionForm}
                    />
            </Container>
        </div>
    );
}
export default ViewAccountPageComponent;