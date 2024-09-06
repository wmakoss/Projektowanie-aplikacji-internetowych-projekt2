const short = require('short-uuid');

var config = require('./config');

var db = config.db;

var AnswerItem = db.answerItem;

async function create(answerPublicID, questionPublicID, answer) {

    try {
        await AnswerItem.create({ answerPublicID: answerPublicID, questionPublicID: questionPublicID, answer: answer});
    }
    catch(e) {
        console.log(e)
    }
    return;
}

async function getByAnswerPublicID(answerPublicID) {
    let data = [];

    try {
        data = await AnswerItem.findAll({
            where: {
                answerPublicID: answerPublicID
            }
        });
    }
    catch(e) {
        console.log(e)
    }

    if (data == undefined) {
        return;
    }

    answerItems = [];

    for(let row of data) {
        answerItems.push({
            "answerPublicID": row["dataValues"]["answerPublicID"],
            "questionPublicID": row["dataValues"]["questionPublicID"],
            "answer": row["dataValues"]["answer"]
        });
    }

    return answerItems;
}

module.exports = {
    create,
    getByAnswerPublicID
};
