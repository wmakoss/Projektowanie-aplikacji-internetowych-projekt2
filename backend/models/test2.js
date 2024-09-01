
var config = require('./config');

var db = config.db;

var Test2 = db.test2;

async function getAll() {
    let data = [];

    try {
        data = await Test2.findAll();
    }
    catch(e) {
        console.log(e)
    }

    return data;
}

async function add(name, email) {

    try {
        await Test2.create({ name: name, email: email });
    }
    catch(e) {
        console.log(e)
    }
}

module.exports = {
    getAll,
    add
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
