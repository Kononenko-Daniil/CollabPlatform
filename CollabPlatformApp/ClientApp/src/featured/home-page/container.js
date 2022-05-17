import React, {Component} from 'react';
import HomePageComponent from './component';

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