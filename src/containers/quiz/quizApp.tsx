import { connect } from "react-redux";

import { validateAction, chooseAction } from "../../store/quiz/actions/actions"

import { Quiz } from "../../models/quiz"

import { StateProps, ActionProps, View } from "../../views/quiz/quizView"

function mapStateToProps(state: any): StateProps {
    return { 
        quizId: state.quiz.current,
        question: state.quiz.quiz[state.quiz.current].question,
        answers: state.quiz.quiz[state.quiz.current].answers,
        chosen: state.quiz.quiz[state.quiz.current].chosen
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        choose: (quizId, i) => dispatch(chooseAction(quizId, i)),
        validate: (quizId) => dispatch(validateAction(quizId))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)