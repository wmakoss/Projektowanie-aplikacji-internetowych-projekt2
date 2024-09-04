import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getQuiz from '../services/GetQuiz';
import './TakeTest.css';

const TakeTest = () => {
  const params = useParams();
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuiz({ 'quizPublicID': params.id });
        setQuizData(data);
      } catch (err) {
        console.error('Error fetching quiz: ', err);
      }
    };

    fetchQuiz();
  }, [params.id]);

  const handleSubmit = async () => {
    //TODO backend
  };

  return (
    <div>
      <h2>Test</h2>
      {quizData ? (
        <div>
          <ol type="1">
            {quizData.map((q, index) => (
              <li className='li-answer' key={index}>
                <div className="question-answer">{q.question}</div>
                <label>
                  <input
                    type="checkbox"
                    className="answer-checkbox"
                  />
                  {q.answer1}
                </label>
                <br /><label>
                  <input
                    type="checkbox"
                    className="answer-checkbox"
                  />
                  {q.answer2}
                </label>
                {q.answer3 === '' ? (
                  <div></div>
                ) : (
                  <br />
                )}
                {q.answer3 === '' ? (
                  <div></div>
                ) : (
                  <label>
                    <input
                      type="checkbox"
                      className="answer-checkbox"
                    />
                    {q.answer3}
                  </label>
                )}
                {q.answer4 === '' ? (
                  <div></div>
                ) : (
                  <br />
                )}
                {q.answer4 === '' ? (
                  <div></div>
                ) : (
                  <label>
                    <input
                      type="checkbox"
                      className="answer-checkbox"
                    />
                    {q.answer4}
                  </label>
                )}
              </li>
            ))}
          </ol>
          <button className="submit-answers-button" onClick={handleSubmit}>
            Submit your answers
          </button>
        </div>
      ) : (
        <p className='loading'>Loading the Test's data...</p>
      )}
    </div>
  );
};

export default TakeTest;
