import React from 'react';
import * as ui from '.';

export class Page extends React.Component {
    state = {
        prevUserid: '',
        userid: ''  
    }

    public render() {
        return (
            <>
                <h1>My To Do List</h1>
                <ui.Login />
            </>
        );
    }
}