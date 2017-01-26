/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router"
import { createSelector } from "reselect"

import { addTodo, removeTodo, close, open } from "../actions/actions";
import { Todo } from "../models/models"
import TodoView from "../views/todo"

const getTodos = state => state.todo

interface StateProps {
    todos: Todo[]
    enabled: boolean
}

interface DispatchProps {
    addTodo(id: number, text: string)
    removeTodo(id: number)
    close()
    open()
}

type Props = StateProps & DispatchProps;

function mapStateToProps(state: any): StateProps {
    console.log(state.stuff.enabled)
    return { todos: getTodos(state), enabled: state.stuff.enabled }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        addTodo: (id: number, text: string) => dispatch(addTodo(id, text)),
        removeTodo: (id: number) => dispatch(removeTodo(id)),
        close: () => dispatch(close()),
        open: () => dispatch(open())
    } // bindActionCreators({ addTodo, removeTodo }, dispatch)
}

function getText(id: string) {
    return (document.getElementById('input') as HTMLInputElement).value
}

class TodoApp extends React.Component<Props, any> {
    props: Props
    n = 2

    render() {
        const {
            todos,
            enabled,
            addTodo,
            removeTodo,
            close,
            open
        } = this.props;
        
        var todoItems = todos.length ? todos.map(item => {
            return <TodoView key={item.id} text={item.text} removeTodo={ () => { removeTodo(item.id) } }></TodoView>;
        }) : [];
        return (
            <div>
                <Link to="/stuff">Goto stuff</Link>
                { todoItems }
                <input type="text" id="input"></input>
                Add todo <button onClick= { () => { addTodo(this.n++, getText('input')) } }>Add todo</button>
                <button onClick={ close }>Close</button><button onClick={ open }>Open</button>
                Is open? : { enabled.toString() }
            </div>
        );
    }
}

export default connect<StateProps, DispatchProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(TodoApp)