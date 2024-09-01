const short = require('short-uuid');

var config = require('./config');

var db = config.db;

var Quiz = db.quiz;

// async function getAll() {
//     let data = [];

//     try {
//         data = await Test2.findAll();
//     }
//     catch(e) {
//         console.log(e)
//     }

//     return data;
// }

async function create(name) {

    let publicID = short.generate();
    let privateID = short.generate();
    // let publicID = "uuidv4()";
    // let privateID = "uuidv4()";
    try {
        await Quiz.create({ name: name, publicID: publicID, privateID: privateID });
    }
    catch(e) {
        console.log(e)
    }
    return {"publicID": publicID, "privateID": privateID};
}

module.exports = {
    create
};

// module.exports = (sequelize, Sequelize) => {
//     const Test2 = sequelize.define("test2", {
//         name: {
//             type: Sequelize.STRING
//         },
//         email: {
//             type: Sequelize.STRING
//         }
//     });
//     return Test2;
// };
