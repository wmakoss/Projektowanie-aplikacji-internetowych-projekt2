const short = require('short-uuid');

var config = require('./config');

var db = config.db;

var Quiz = db.quiz;

async function create(name) {

    let quizPublicID = short.generate();
    let quizPrivateID = short.generate();
    try {
        await Quiz.create({ quizPublicID: quizPublicID, quizPrivateID: quizPrivateID, name: name, });
    }
    catch(e) {
        console.log(e)
    }
    return {"quizPublicID": quizPublicID, "quizPrivateID": quizPrivateID};
}

async function getByQuizPublicID(quizPublicID) {
    let data = [];

    try {
        data = await Quiz.findAll({
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

    return data[0]["dataValues"];
}

async function getByQuizPrivateID(quizPrivateID) {
    let data = [];

    try {
        data = await Quiz.findAll({
            where: {
                quizPrivateID: quizPrivateID
            }
        });
    }
    catch(e) {
        console.log(e)
    }

    return data[0]["dataValues"];
}

module.exports = {
    create,
    getByQuizPublicID,
    getByQuizPrivateID
};
