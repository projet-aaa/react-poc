import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/quiz/quizView'

viewTestFactory<Props>(View, {
    quizId: 0,
    question: "Est ce que je ok?",
    answers: ["peut être", "mr l'arbitre", "oui", "D"],
    choose: (i) => console.log("Test : " + i),
    validate: () => console.log("Je valide!"),
    chosen: 1
})