import React from 'react';
import {useLocation} from 'react-router-dom';
import '../assets/TestCreated.css';

const TestCreated = () => {
    const location = useLocation();

    return (
        <div>
            <h2>Create a new Test</h2><br />
            <h3>The Test has been created successfully!</h3><br />
            <p className='testcreated-p'>Test's public ID: <i>{location.state.quizPublicID}</i></p>
            <p className='testcreated-p'>Test's private ID: <i>{location.state.quizPrivateID}</i></p><br />
            <p className='testcreated-p'>A public ID lets people take your test, while a private ID lets you check people's responses (their answers).</p>
        </div>
    );
};

export default TestCreated;
