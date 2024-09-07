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

async function getQuizPublicIDByQuestionPublicID(questionPublicID) {
    let data = [];

    try {
        data = await Question.findAll({
            where: {
                questionPublicID: questionPublicID
            }
        });
    }
    catch(e) {
        console.log(e)
    }

    if (data == undefined || data[0] == undefined || data[0]["dataValues"] == undefined || data[0]["dataValues"]["quizPublicID"] == undefined) {
        return;
    }

    return data[0]["dataValues"]["quizPublicID"];
}

async function getCorrectByQuestionPublicID(questionPublicID) {
    let data = [];

    try {
        data = await Question.findAll({
            where: {
                questionPublicID: questionPublicID
            }
        });
    }
    catch(e) {
        console.log(e)
    }

    if (data == undefined || data[0] == undefined || data[0]["dataValues"] == undefined || data[0]["dataValues"]["correct"] == undefined) {
        return;
    }

    return data[0]["dataValues"]["correct"];
}

async function getByQuestionPublicID(questionPublicID) {
    let data = [];

    try {
        data = await Question.findAll({
            where: {
                questionPublicID: questionPublicID
            }
        });
    }
    catch(e) {
        console.log(e)
    }

    if (data == undefined || data[0] == undefined || data[0]["dataValues"] == undefined ) {
        return;
    }

    return data[0]["dataValues"];
}

module.exports = {
    create,
    getByQuizPublicID,
    getQuizPublicIDByQuestionPublicID,
    getCorrectByQuestionPublicID,
    getByQuestionPublicID
};
