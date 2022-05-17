import axios from 'axios';
import React, {Component} from 'react';
import HomePageComponent from './component';
import constants from '../../Constants';

export class HomePageContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <HomePageComponent />
        )
    }
}