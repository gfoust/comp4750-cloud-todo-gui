import React from 'React';
import { TodoItem, TodoItemProps } from './TodoItem';

export interface TodoListProps {
    userid?: string
}

export class TodoList extends React.Component {
    state = {
        userid: '',
        items: []
    }
}