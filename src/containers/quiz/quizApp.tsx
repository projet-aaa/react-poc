import { connect } from "react-redux";

import { validateAction, chooseAction } from "../../store/quiz/actions/actions"

import { Quiz } from "../../models/quiz"

import { StateProps, ActionProps, View } from "../../views/quiz/quizView"

function mapStateToProps(state: any): StateProps {
    return { 
        question: state.quiz.question,
        answers: state.quiz.answers,
        chosen: state.quiz.chosen
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        choose: (i) => dispatch(chooseAction(i)),
        validate: () => dispatch(validateAction())
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)