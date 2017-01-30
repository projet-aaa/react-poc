import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as AnswerView} from "./answerView"

export interface StateProps {
    quizId: number
    question: string
    answers: string[]
    chosen: number
}
export interface ActionProps {
    choose(quizId: number, chosenNb: number)
    validate(quizId: number)
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quizId, question, answers, chosen,
            choose, validate
        } = this.props;

        var answerItems = answers.length ? answers.map((item, i) => {
            return <AnswerView key={item} text={item} choose={ () => { choose(quizId, i) } } chosen={ chosen == i }></AnswerView>;
        }) : [];
        return (
            <div>
                <h2>Question : {question} </h2>
                <ul>
                    {answerItems}
                </ul>
                <button onClick={ () => validate(quizId) } > Valider </button>
            </div>
        );
    }
}