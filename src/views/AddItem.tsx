import React from 'react';

export interface AddItemProps {
    onSubmit: (description: string) => void;
    disabled: boolean;
}

interface AddItemState {
    description: string;
}

export class AddItem extends React.Component<AddItemProps, AddItemState> {
    state = { description: '' };

    addItem = (event: React.FormEvent) => {
        event.preventDefault();
        if (!this.props.disabled) {
            this.props.onSubmit(this.state.description);
            this.setState({ description: '' });
        }
    }

    descriptionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            description: event.target.value,
        });
    }

    render() {
        return (
            <form id="add-item" onSubmit={this.addItem}>
                <input 
                    type="text" 
                    style={{width: '32ex'}}
                    value={this.state.description}
                    onChange={this.descriptionChanged}
                    disabled={this.props.disabled}
                />
                &nbsp;
                <input type="submit" disabled={this.props.disabled} value="Add"/>
            </form>
        );
    }
}