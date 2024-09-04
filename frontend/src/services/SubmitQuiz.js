const submitQuestion = async (question) => {
    try {
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/question/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        });

        if (!response.ok) {
            console.error('Failed to create question');
            return false;
        } else {
            return true;
        }
    } catch (err) {
        console.error('Failed to create question');
        return false;
    }
}

const submitQuiz = async (options, questions) => {
    try {
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/quiz/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        });

        if (!response.ok) {
            throw new Error('Failed to create quiz');
        } else {
            const quizIDs = await response.json();
            const quizPrivateID = quizIDs.privateID;
            const quizPublicID = quizIDs.publicID;

            questions.forEach(async question => {
                const correctIndex = question.answers.findIndex(a => a.correct) + 1;
                const questionPayload = {
                    'quizPrivateID': quizPrivateID,
                    'question': question.question,
                    'answer1': question.answers[0]?.text || '',
                    'answer2': question.answers[1]?.text || '',
                    'answer3': question.answers[2]?.text || '',
                    'answer4': question.answers[3]?.text || '',
                    'correct': correctIndex
                };
                if (!(await submitQuestion(questionPayload))) {
                    throw new Error('Failed to create quiz');
                }
            });
            
            return quizPublicID;
        }
    } catch (err) {
        throw new Error('Failed to create quiz');
    }
}

export default submitQuiz
