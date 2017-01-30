import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as AnswerView} from "./answerView"

export interface StateProps {
   question: string
   answers: string[]
   chosen: number
}
export interface ActionProps {
    choose(chosenNb: number)
    validate()
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            question,answers,chosen,choose,validate
        } = this.props;

        var answerItems = answers.length ? answers.map((item, i) => {
            return <AnswerView key={item} text={item} choose={ () => { choose(i) } } chosen={ chosen == i }></AnswerView>;
        }) : [];
        return (
            <div>
                <h2>Question : {question} </h2>
                <ul>
                    {answerItems}
                </ul>
                <button onClick={validate} > Valider </button>
            </div>
        );
    }
}