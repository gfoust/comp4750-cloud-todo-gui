import React from 'react';
import * as ui from '.';
import * as api from '../api';

export interface TodoListProps {
    userid: string
}

interface TodoListState {
    userid: string;
    loading: boolean;
    items: api.Item[];
    nextItem: string;
}

export class TodoList extends React.Component<TodoListProps, TodoListState> {

    get validUser() {
        return !!this.state.userid.match(/^\S+$/);
    }
    
    loadItems(userid: string) {
        if (userid.match(/^\S+$/)) {
            api.getItems(userid).then(result => {
                if (this.state.userid === userid) {
                    (window as any).allitems = result;
                    this.setState({
                        loading: false,
                        items: result
                    });
                }
            })
        }
    }

    constructor(props: TodoListProps) {
        super(props);
        let userid = props.userid;
        this.state = {
            userid,
            loading: !!userid,
            items: [],
            nextItem: '',
        }
        this.loadItems(userid);
    }


    componentDidUpdate = (prevProps: TodoListProps) => {
        let userid = this.props.userid;
        if (userid !== prevProps.userid) {
            this.setState({
                userid,
                loading: !!userid,
                items: []
            });
            this.loadItems(userid);
        }
    }

    itemCompleteChanged = (item: api.Item, complete: boolean) => {
        if (complete != item.complete) {
            this.setState({ 
                items: this.state.items.map(olditem => {
                    if (olditem == item) {
                        return { ...item, complete };
                    }
                    else {
                        return olditem;
                    }
                })
            })
            api.setComplete(item, complete);
        }
    }

    removeCompletedItems = () => {
        if (confirm('Permanently delete all items which are completed?')) {
            for (let item of this.state.items) {
                if (item.complete) {
                    api.removeItem(item);
                }
            }
            this.setState({
                items: this.state.items.filter(item => !item.complete)
            });
        }
    }

    itemAdded = async (description: string) => {
        let userid = this.state.userid;
        if (userid) {
            let { created } = await api.addItem(userid, description);
            if (this.state.userid === userid) {
                this.setState({
                    items: [
                        ...this.state.items,
                        {   
                            userid,
                            description,
                            created,
                            complete: false
                        }
                    ],
                });
            }
        }

    }

    render() {
        if (!this.validUser) {
            return (
                <h4>Invalid User ID</h4>
            );
        }
        else if (this.state.loading) {
            return (
                <h4>Loading...</h4>
            )
        }
        else if (this.state.items.length === 0) {
            return (
                <>
                    <h4>No items found</h4>
                    <ui.AddItem onSubmit={this.itemAdded} disabled={!this.validUser}/>
                </>
            )
        }
        return (
            <>
                <ul>
                {
                    this.state.items.map(item => <ui.TodoItem key={item.created} item={item} onCompleteChange={this.itemCompleteChanged}/>)
                }
                </ul>
                <input 
                    id="remove-btn"
                    type="button" 
                    onClick={this.removeCompletedItems}
                    value="Remove Completed Items"
                    disabled={this.state.items.every(item => !item.complete)}
                />
                <ui.AddItem onSubmit={this.itemAdded} disabled={!this.validUser}/>
            </>
        );
    }
}