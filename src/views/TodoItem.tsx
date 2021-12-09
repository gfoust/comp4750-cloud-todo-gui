import React from 'react';
import * as api from '../api';

export interface TodoItemProps {
    item: api.Item,
    onCompleteChange: (item: api.Item, complete: boolean) => void,
}

export function TodoItem(props: TodoItemProps) {
    let className = props.item.complete ? 'complete' : '';
    return (
        <li className={className}>
            <input 
                type="checkbox" 
                checked={props.item.complete} 
                onChange={event => props.onCompleteChange(props.item, event.target.checked)}
            />
            {props.item.description}
        </li>
    )
}
