const short = require('short-uuid');

var config = require('./config');

var db = config.db;

var Question = db.question;

async function create(quizID, question, answer1, answer2, answer3, answer4, correct) {

    let UUID = short.generate();
    try {
        await Question.create({ UUID: UUID, quizID: quizID, question: question, answer1: answer1, answer2: answer2, answer3: answer3, answer4: answer4, correct: correct });
    }
    catch(e) {
        console.log(e)
    }
    return {"questionID": UUID};
}

async function getByQuizID(quizID) {
    let data = [];

    try {
        data = await Question.findAll({
            where: {
                quizID: quizID
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
    getByQuizID
};
