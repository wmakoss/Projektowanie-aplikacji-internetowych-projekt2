const getTestResponses = async (quizPrivateID) => {
    try {
        const response = await fetch(`http://localhost:8080/quiz/getAnswersByQuizPrivateID`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quizPrivateID)
        });

        if (!response.ok) {
            throw new Error('Wrong private ID');
        } else {
            return response.json();
        }
    } catch (err) {
        throw new Error('Error while fetching test responses');
    }
}

export default getTestResponses
