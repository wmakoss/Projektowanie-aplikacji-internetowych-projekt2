import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quiz from '../services/GetQuiz'
import submitAnswers from '../services/SubmitAnswers';
import './TakeTest.css';

const TakeTest = () => {
  const params = useParams();
  const [quizName, setQuizName] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [userName, setUserName] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await Quiz.getQuizData({ 'quizPublicID': params.id });
        setQuizData(data);
        const name = await Quiz.getQuizName({ 'quizPublicID': params.id });
        setQuizName(name.quizName);
      } catch (err) {
        console.error('Error fetching quiz: ', err);
      }
    };

    fetchQuiz();
  }, [params.id]);

  const handleCheckboxChange = (questionIndex, answerIndex) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionIndex]: prevSelectedAnswers[questionIndex] === answerIndex ? undefined : answerIndex,
    }));
  };

  const isCheckboxDisabled = (questionIndex, answerIndex) => {
    return selectedAnswers[questionIndex] !== undefined && selectedAnswers[questionIndex] !== answerIndex;
  };

  const handleSubmit = async () => {
    if (userName.trim() === '') {
      alert('Please enter your name!');
      return;
    }

    const answers = quizData.reduce((acc, question, index) => {
      if (selectedAnswers[index] !== undefined) {
        acc.push({
          'questionPublicID': question.questionPublicID,
          'answer': selectedAnswers[index],
        });
      }
      return acc;
    }, []);

    try {
      const answerIDs = await submitAnswers({
        'userName': userName,
        'quizPublicID': params.id,
        'answers': answers
      });
      alert(`Your answers has been sent successfully.\nAnswers' public ID: ${answerIDs.answerPublicID}\nAnswers' private ID: ${answerIDs.answerPrivateID}`);
      setUserName('');
      setQuizName('');
      setQuizData(null);
      setSelectedAnswers({});
      navigate(`/checkAnswers`)///${answerIDs.answerPrivateID}`)
    } catch (err) {
      alert(`An error has occured: ${err}`);
    }
  };

  return (
    <div>
      <h2>{quizName}</h2><br />
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your name"
        className="user-name-input"
      /><br />
      {quizData ? (
        <div>
          <ol type="1">
            {quizData.map((q, questionIndex) => (
              <li className='li-answer' key={questionIndex}>
                <div className="question-answer">{q.question}</div>
                <label>
                  <input
                    type="checkbox"
                    className="answer-checkbox"
                    disabled={isCheckboxDisabled(questionIndex, 1)}
                    checked={selectedAnswers[questionIndex] === 1}
                    onChange={() => handleCheckboxChange(questionIndex, 1)}
                  />
                  {q.answer1}
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    className="answer-checkbox"
                    disabled={isCheckboxDisabled(questionIndex, 2)}
                    checked={selectedAnswers[questionIndex] === 2}
                    onChange={() => handleCheckboxChange(questionIndex, 2)}
                  />
                  {q.answer2}
                </label>
                {q.answer3 && (
                  <>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        className="answer-checkbox"
                        disabled={isCheckboxDisabled(questionIndex, 3)}
                        checked={selectedAnswers[questionIndex] === 3}
                        onChange={() => handleCheckboxChange(questionIndex, 3)}
                      />
                      {q.answer3}
                    </label>
                  </>
                )}
                {q.answer4 && (
                  <>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        className="answer-checkbox"
                        disabled={isCheckboxDisabled(questionIndex, 4)}
                        checked={selectedAnswers[questionIndex] === 4}
                        onChange={() => handleCheckboxChange(questionIndex, 4)}
                      />
                      {q.answer4}
                    </label>
                  </>
                )}
              </li>
            ))}
          </ol>
          <button className="submit-answers-button" onClick={handleSubmit}>
            Submit your answers
          </button>
        </div>
      ) : (
        <p className='loading'>Loading Test's data...</p>
      )}
    </div>
  );
};

export default TakeTest;
