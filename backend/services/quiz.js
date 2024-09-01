
var quizModel = require('../models/quiz');

async function createQuiz(name) {
    return await quizModel.create(name);
}

module.exports = {
    createQuiz
};
