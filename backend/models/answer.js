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

// async function getByQuizPublicID(quizPublicID) {
//     let data = [];

//     try {
//         data = await Quiz.findAll({
//             where: {
//                 quizPublicID: quizPublicID
//             }
//         });
//     }
//     catch(e) {
//         console.log(e)
//     }

//     if (data == undefined || data.length < 1) {
//         return;
//     }

//     return data[0]["dataValues"];
// }

// async function getByQuizPrivateID(quizPrivateID) {
//     let data = [];

//     try {
//         data = await Quiz.findAll({
//             where: {
//                 quizPrivateID: quizPrivateID
//             }
//         });
//     }
//     catch(e) {
//         console.log(e)
//     }

//     return data[0]["dataValues"];
// }

module.exports = {
    create,
    // getByQuizPublicID,
    // getByQuizPrivateID
};
