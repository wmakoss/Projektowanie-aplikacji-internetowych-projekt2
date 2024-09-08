const getQuizData = async (quizPublicID) => {
    try {
        const response = await fetch(`http://localhost:8080/question/getQuestionsByQuizPublicID`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quizPublicID)
        });

        if (!response.ok) {
            throw new Error('Wrong public ID');
        } else {
            return response.json();
        }
    } catch (err) {
        throw new Error('Error while fetching test data');
    }
}

const getQuizName = async (quizPublicID) => {
    try {
        const response = await fetch(`http://localhost:8080/quiz/getNameByQuizPublicID`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quizPublicID)
        });

        if (!response.ok) {
            throw new Error('Wrong public ID');
        } else {
            return response.json();
        }
    } catch (err) {
        throw new Error('Error while fetching test name');
    }
}

const Quiz = {
    getQuizData,
    getQuizName
}

export default Quiz
