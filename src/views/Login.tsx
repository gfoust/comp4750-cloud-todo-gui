import React from 'react';

export interface LoginProps {
    onUseridUpdate?: (userid: string) => void;
}

interface LoginState {
    prevUserid: string;
    userid: string;
}

export class Login extends React.Component<LoginProps, LoginState> {
    state = {
        prevUserid: '',
        userid: ''
    }

    changeUserid = (event: React.ChangeEvent) => {
        let target = event.target as HTMLInputElement;
        this.setState({ userid: target.value });
    }

    updateUserid = (event: React.FormEvent) => {
        event.preventDefault();
        if (this.state.userid != this.state.prevUserid) {
            this.setState({ prevUserid: this.state.userid });
            if (this.props.onUseridUpdate) {
                this.props.onUseridUpdate(this.state.userid);
            }
        }
    }

    checkUserid = (event: React.FormEvent) => {
        if (this.state.userid != this.state.prevUserid) {
            if (confirm('Switch user id?')) {
                this.updateUserid(event);
            }
            else {
                this.setState({ userid: this.state.prevUserid });
            }
        }
    }

    public render() {
        return (
            <>
                <form onSubmit={this.updateUserid}>
                    User Id: &nbsp;
                    <input 
                        type="text"
                        autoFocus
                        value={this.state.userid} 
                        onChange={this.changeUserid} 
                        onBlur={this.checkUserid} 
                    />
                    <input type="submit" value="Go"/>
                </form>
            </>
        );
    }
}