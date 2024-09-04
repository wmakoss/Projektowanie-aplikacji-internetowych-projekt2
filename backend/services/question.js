
var quizModel = require('../models/quiz');
var questionModel = require('../models/question');

async function createQuestion(quizPrivateID, question, answer1, answer2, answer3, answer4, correct) {

    var quiz = await quizModel.getByPrivateID(quizPrivateID);

    if (quiz["UUID"] == undefined) {
        return null;
    }

    return await questionModel.create(quiz["UUID"], question, answer1, answer2, answer3, answer4, correct);
}

async function getQuestionsBypublicID(quizPublicID) {

    var quiz = await quizModel.getByPublicID(quizPublicID);

    if (quiz == undefined || quiz["UUID"] == undefined) {
        return null;
    }

    var questionsDB = await questionModel.getByQuizID(quiz["UUID"]);

    questions = [];

    for(let question of questionsDB) {
        questions.push({
            "UUID": question["dataValues"]["UUID"],
            "question": question["dataValues"]["question"],
            "answer1": question["dataValues"]["answer1"],
            "answer2": question["dataValues"]["answer2"],
            "answer3": question["dataValues"]["answer3"],
            "answer4": question["dataValues"]["answer4"]
        });
    }

    return questions;
}

module.exports = {
    createQuestion,
    getQuestionsBypublicID
};
