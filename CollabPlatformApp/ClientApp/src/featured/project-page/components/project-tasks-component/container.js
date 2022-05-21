import React, { Component } from 'react';

import ProjectTasksComponent from './component';
import SpinnerComponent from '../../../static-components/spinner/component';

import axios from 'axios';
import constants from '../../../../Constants';

export class ProjectTasksContainer extends Component{
    constructor(props){
        super(props);
        const{ projectId } = this.props;
        
        this.state = {
            projectId: projectId,
            tasks: undefined,
            taskText: "",
            errorTaskTextMessage: ""
        }

        this.handleTaskTextChange = this.handleTaskTextChange.bind(this);
        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.OnClearTaskForm = this.OnClearTaskForm.bind(this);
        this.OnDeleteTaskClick = this.OnDeleteTaskClick.bind(this);
    }

    componentDidMount(){
        this.getTasks();
    }

    handleTaskTextChange(event) {
        this.setState({ taskText: event.target.value });
    }

    handleTaskSubmit(event) {
        const task = {
            projectId: this.state.projectId,
            text: this.state.taskText
        };

        this.clearErrorMessages();
        
        axios({
            method: 'POST',
            url: constants.apiPort + '/tasks/create-task',
            data: task,
            withCredentials: true
        }).then(res=>{
            this.getTasks();

            this.setState({ taskText: "" });
        }).catch(this.errorCatcher);
        
        event.preventDefault();
    }

    OnClearTaskForm = () => {
        this.setState({ errorTaskTextMessage: "" });
        this.setState({ taskText: "" });
    }

    OnDeleteTaskClick = (taskId) => {
        axios({
            method: 'DELETE',
            url: constants.apiPort + '/tasks/delete-task',
            withCredentials: true,
            params: { projectId: this.state.projectId, taskId: taskId }
        }).then(res=>{
            this.getTasks();
        });
    }

    clearErrorMessages = () => {
        this.setState({ errorTaskTextMessage: "" });
    }

    errorCatcher = (error) => {
        const errorType = error.response.data.errorType;
        const errorMessage = error.response.data.errorMessage;

        if(errorType === "Text"){
            this.setState({ errorTaskTextMessage: errorMessage });
        }
    }

    getTasks(){
        axios({
            method: 'GET',
            url: constants.apiPort + '/tasks/get-project-tasks',
            params: { projectId: this.state.projectId },
            withCredentials: true
        }).then(res => {
                const tasks = res.data;
                this.setState({ tasks: tasks });
            }
        );
    }

    render(){
        if(this.state.tasks !== undefined){
            return(
                <ProjectTasksComponent 
                    tasks={this.state.tasks}
                    handleTaskTextChange={this.handleTaskTextChange}
                    handleTaskSubmit={this.handleTaskSubmit}
                    OnClearTaskForm={this.OnClearTaskForm}
                    OnDeleteTaskClick={this.OnDeleteTaskClick}
                    taskText={this.state.taskText}
                    errorTaskTextMessage={this.state.errorTaskTextMessage}
                    />
            );
        } else {
            return(
                <SpinnerComponent />
            );
        }
    }
}