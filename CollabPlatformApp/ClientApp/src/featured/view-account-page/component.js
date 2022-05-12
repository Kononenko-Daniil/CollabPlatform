import React from 'react';

import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import avatar_2 from './img/avatar_2.jpg';

const ViewAccountPageComponent = (props) => {
    const {
        user
    } = props;

    return(
        <Container>
            {
                user.projects !== undefined ?
                    <div className={'row accountView'}>
                        <div className={'col-md-auto avatarPlace'}>
                            <img src={avatar_2} className={'accountImgView'}/>
                            <p className={'userName'} >{user.name}</p>
                            <p className={'smallTextAccount'}><b>{user.projects.length}</b> projects</p>
                        </div>
                        <div className={'col-md-auto'}>
                            <p className={'userName'}>Here will be usefull information about user</p>
                        </div>
                    </div>
                :
                <div>
                    <Spinner animation="border" variant="secondary" className={'loadingSpinner'} />
                </div>
            }
            
        </Container>
    );
}
export default ViewAccountPageComponent;