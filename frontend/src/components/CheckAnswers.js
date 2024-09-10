import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Answers from '../services/GetAnswers';
import Quiz from '../services/GetQuiz';
import '../assets/CheckAnswers.css';

const CheckAnswers = () => {
    const params = useParams();
    const [quizName, setQuizName] = useState('');
    const [score, setScore] = useState(0);
    const [answersData, setAnswersData] = useState({});

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const data = await Answers.getAnswersReview({ 'answerPrivateID': params.id });
                setAnswersData(data);
                setScore((parseInt(data.score) / parseInt(data.answers.length) * 100).toFixed(2));
                const name = await Quiz.getQuizName({ 'quizPublicID': data.quizPublicID });
                setQuizName(name.quizName);
            } catch (err) {
                console.error('Error fetching answers: ', err);
            }
        };

        fetchAnswers();
    }, [params.id]);

    return (
        <div>
            {quizName ? (
                <div>
                    <h2>{quizName}</h2><br />
                    <h3>User: <i>{answersData.userName}</i></h3>
                    <h3>Score: <i>{answersData.score}/{answersData.answers.length} ({score}%)</i></h3><br />
                    <div>
                        <ol type="1">
                            {answersData.answers.map((q, questionIndex) => (
                                <li className='li-test-answer' key={questionIndex}>
                                    <div className="question-test-answer"><b>{q.question}</b></div>
                                    <ol type="A">
                                        <li
                                            className={q.userAnswer === 1 ? (q.correct === 1 ? 'correct' : 'incorrect') : (q.correct === 1 ? 'correct' : 'none')}
                                        >
                                            {q.answer1}
                                        </li>
                                        <li
                                            className={q.userAnswer === 2 ? (q.correct === 2 ? 'correct' : 'incorrect') : (q.correct === 2 ? 'correct' : 'none')}
                                        >
                                            {q.answer2}
                                        </li>
                                        {q.answer3 && (
                                            <li
                                                className={q.userAnswer === 3 ? (q.correct === 3 ? 'correct' : 'incorrect') : (q.correct === 3 ? 'correct' : 'none')}
                                            >
                                                {q.answer3}
                                            </li>
                                        )}
                                        {q.answer4 && (
                                            <li
                                                className={q.userAnswer === 4 ? (q.correct === 4 ? 'correct' : 'incorrect') : (q.correct === 4 ? 'correct' : 'none')}
                                            >
                                                {q.answer4}
                                            </li>
                                        )}
                                    </ol>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            ) : (
                <p className='loading'>Loading answers' data...</p>
            )}
        </div>
    );
};

export default CheckAnswers;
