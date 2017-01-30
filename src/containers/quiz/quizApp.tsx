import { connect } from "react-redux";

import { validateAction, chooseAction } from "../../store/quiz/actions/actions"

import { Quiz } from "../../models/quiz"

import { StateProps, ActionProps, View } from "../../views/quiz/quizView"

function mapStateToProps(state: any): StateProps {
    return { 
        quiz: state.quiz.quiz[state.quiz.current]
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