const short = require('short-uuid');

var config = require('./config');

var db = config.db;

var Quiz = db.quiz;

async function create(name) {

    let UUID = short.generate();
    let publicID = short.generate();
    let privateID = short.generate();
    // let publicID = "uuidv4()";
    // let privateID = "uuidv4()";
    try {
        await Quiz.create({ UUID: UUID, name: name, publicID: publicID, privateID: privateID });
    }
    catch(e) {
        console.log(e)
    }
    return {"publicID": publicID, "privateID": privateID};
}

async function getByUUID(UUID) {
    let data = [];

    try {
        data = await Quiz.findAll({
            where: {
                UUID: UUID
            }
        });
    }
    catch(e) {
        console.log(e)
    }

    return data[0]["dataValues"];
}

async function getByPublicID(publicID) {
    let data = [];

    try {
        data = await Quiz.findAll({
            where: {
                publicID: publicID
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

async function getByPrivateID(privateID) {
    let data = [];

    try {
        data = await Quiz.findAll({
            where: {
                privateID: privateID
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
    getByUUID,
    getByPublicID,
    getByPrivateID
};
