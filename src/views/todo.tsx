import * as React from "react";

import { Todo } from "../models/models"

interface Props {
    removeTodo(): void
    key: number
    text: string
}

export default class TodoView extends React.Component<Props, any> {

    props: Props

    render() {
        const {
            removeTodo,
            key,
            text
         } = this.props;

        return (
            <li> { text } <button onClick={ removeTodo } >Delete</button> </li>
        );
    }
}
