const getQuiz = async (quizPublicID) => {
    try {
        const response = await fetch(`http://localhost:8080/question/getQuestionsByquizPublicID`, {
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

export default getQuiz
