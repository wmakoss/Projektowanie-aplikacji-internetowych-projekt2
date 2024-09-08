const submitAnswers = async (data) => {
    try {
        const response = await fetch(`http://localhost:8080/answer/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Wrong public ID');
        } else {
            return response.json();
        }
    } catch (err) {
        throw new Error('Error while sending answers');
    }
}

export default submitAnswers
