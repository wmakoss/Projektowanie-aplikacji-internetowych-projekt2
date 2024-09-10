import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import getTestResponses from '../services/GetResponses';
import Quiz from '../services/GetQuiz';
import '../assets/CheckTestResponses.css';

const CheckTestResponses = () => {
    const params = useParams();
    const [quizName, setQuizName] = useState("Check all Test's responses");
    const [score, setScore] = useState(0);
    const [responsesData, setResponsesData] = useState({});

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const data = await getTestResponses({ 'quizPrivateID': params.id });
                setResponsesData(data);
                if (data.length > 0) {
                    let sum = 0;
                    data.forEach(element => {
                        sum += element.score;
                    });
                    setScore((parseInt(sum) / (parseInt(data[0].numberOfQuestions) * data.length) * 100).toFixed(2));
                    const name = await Quiz.getQuizName({ 'quizPublicID': data[0].quizPublicID });
                    setQuizName(`Test: ${name.quizName}`);
                } else {
                    setResponsesData({ 'test': 'test' });
                }
            } catch (err) {
                console.error('Error fetching responses: ', err);
            }
        };

        fetchAnswers();
    }, [params.id]);

    return (
        <div>
            <h2>{quizName}</h2><br />
            {responsesData ? (
                <div>
                    {responsesData.length > 0 && !responsesData.test ? (
                        <><h3>Average score: <i>{score}%</i></h3><br /><div>
                            <ol type="1">
                                {responsesData.map((q, questionIndex) => (
                                    <li className='li-test-response' key={questionIndex}>
                                        <Link to={{ pathname: `/checkAnswers/${q.answerPrivateID}` }}>{q.userName}</Link>
                                        <label> - score: <i>{q.score}/{q.numberOfQuestions}</i></label><br /><br /><br />
                                    </li>
                                ))}
                            </ol>
                        </div></>
                    ) : (
                        <p className='loading'>No responses yet...</p>
                    )}
                </div>
            ) : (
                <p className='loading'>Loading responses' data...</p>
            )}
        </div>
    );
};

export default CheckTestResponses;
