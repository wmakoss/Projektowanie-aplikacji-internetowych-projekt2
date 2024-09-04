const getQuiz = async (publicId) => {
    try {
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/question/getQuestionsBypublicID`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(publicId)
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
