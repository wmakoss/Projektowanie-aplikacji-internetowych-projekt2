const short = require('short-uuid');

var config = require('./config');

var db = config.db;

var Answer = db.answer;

async function create(quizPublicID, userName) {

    let answerPublicID = short.generate();
    let answerPrivateID = short.generate();
    try {
        await Answer.create({ answerPublicID: answerPublicID, answerPrivateID: answerPrivateID, quizPublicID: quizPublicID, userName: userName});
    }
    catch(e) {
        console.log(e)
    }
    return {"answerPublicID": answerPublicID, "answerPrivateID": answerPrivateID};
}

async function getByAnswerPrivateID(answerPrivateID) {
    let data = [];

    try {
        data = await Answer.findAll({
            where: {
                answerPrivateID: answerPrivateID
            }
        });
    }
    catch(e) {
        console.log(e)
    }

    if (data == undefined || data.length < 1) {
        return;
    }

    return data[0]["dataValues"];
}

async function getByQuizPublicID(quizPublicID) {
    let data = [];

    try {
        data = await Answer.findAll({
            where: {
                quizPublicID: quizPublicID
            }
        });
    }
    catch(e) {
        console.log(e)
    }

    if (data == undefined || data.length < 1) {
        return;
    }

    answers = [];

    for(let row of data) {
        answers.push({
            "answerPrivateID": row["dataValues"]["answerPrivateID"],
            "quizPublicID": row["dataValues"]["quizPublicID"],
            "userName": row["dataValues"]["userName"]
        });
    }

    return answers;
}

module.exports = {
    create,
    getByAnswerPrivateID,
    getByQuizPublicID
};
