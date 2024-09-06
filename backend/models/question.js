const short = require('short-uuid');

var config = require('./config');

var db = config.db;

var Question = db.question;

async function create(quizPublicID, question, answer1, answer2, answer3, answer4, correct) {

    let questionPublicID = short.generate();
    let questionPrivateID = short.generate();
    try {
        await Question.create({ questionPublicID: questionPublicID, questionPrivateID: questionPrivateID, quizPublicID: quizPublicID, question: question, answer1: answer1, answer2: answer2, answer3: answer3, answer4: answer4, correct: correct });
    }
    catch(e) {
        console.log(e)
    }
    return {"questionPublicID": questionPublicID, "questionPrivateID": questionPrivateID};
}

async function getByQuizPublicID(quizPublicID) {
    let data = [];

    try {
        data = await Question.findAll({
            where: {
                quizPublicID: quizPublicID
            }
        });
    }
    catch(e) {
        console.log(e)
    }

    return data;
}

module.exports = {
    create,
    getByQuizPublicID
};
