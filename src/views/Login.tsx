import React from 'react';

export interface LoginProps {
    onUseridUpdate?: (userid: string) => void;
}

export class Login extends React.Component<LoginProps> {
    state = {
        prevUserid: '',
        userid: ''
    }

    updateCb?: (userid: string) => void;

    constructor(props: LoginProps) {
        super(props);
        this.updateCb = props.onUseridUpdate;
    }

    changeUserid = (event: React.ChangeEvent) => {
        let target = event.target as HTMLInputElement;
        this.setState({ userid: target.value });
    }

    updateUserid = (event: React.FormEvent) => {
        event.preventDefault();
        if (this.state.userid != this.state.prevUserid) {
            this.setState({ prevUserid: this.state.userid });
            if (this.updateCb) {
                this.updateCb(this.state.userid);
            }
        }
    }

    public render() {
        return (
            <>
                <form onSubmit={this.updateUserid}>
                    User Id: 
                    <input 
                        type="text"
                        value={this.state.userid} 
                        onChange={this.changeUserid} 
                        onBlur={this.updateUserid} 
                    />
                    <input type="submit" value="Go"/>
                </form>
            </>
        );
    }
}