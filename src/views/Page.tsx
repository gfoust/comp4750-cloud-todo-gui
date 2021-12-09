import React from 'react';
import * as ui from '.';

interface PageState {
    userid: string;
}

export class Page extends React.Component<{}, PageState> {
    state = {
        userid: ''  
    }

    updateUserid = (userid: string) => {
        this.setState({
            userid: userid
        });
    }

    public render() {
        return (
            <>
                <h1>My To Do List</h1>
                <ui.Login onUseridUpdate={this.updateUserid}/>
                <ui.TodoList userid={this.state.userid}/>
            </>
        );
    }
}