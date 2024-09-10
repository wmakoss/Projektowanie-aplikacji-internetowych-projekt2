import React from 'react';
import {useLocation} from 'react-router-dom';
import '../assets/TestTaken.css';

const TestTaken = () => {
    const location = useLocation();

    return (
        <div>
            <h2>Thank you</h2><br />
            <h3>Your answers have been submitted successfully!</h3><br />
            <p className='testtaken-p'>Answers' ID: <i>{location.state.answerPrivateID}</i></p><br />
            <p className='testtaken-p'>This ID lets you check how you did.</p>
        </div>
    );
};

export default TestTaken;
