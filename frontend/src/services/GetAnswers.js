const getScore = async (answerPrivateID) => {
    try {
        const response = await fetch(`http://localhost:8080/answer/checkScore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answerPrivateID)
        });

        if (!response.ok) {
            throw new Error('Wrong private ID');
        } else {
            return response.json();
        }
    } catch (err) {
        throw new Error('Error while fetching score');
    }
}

const getAnswersReview = async (answerPrivateID) => {
    try {
        const response = await fetch(`http://localhost:8080/answer/reviewAnswer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answerPrivateID)
        });

        if (!response.ok) {
            throw new Error('Wrong private ID');
        } else {
            return response.json();
        }
    } catch (err) {
        throw new Error('Error while fetching answers data');
    }
}

const Answers = {
    getScore,
    getAnswersReview
}

export default Answers