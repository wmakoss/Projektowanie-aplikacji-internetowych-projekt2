
const DB_PATH = '../database/database.sqlite3';
const DB_DIALECT =  'sqlite';

const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    storage: DB_PATH,
    dialect: DB_DIALECT,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.test2 = sequelize.define("test2", {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

db.sequelize.sync({force: false})
// false - nienadpisuje struktury bazy i danych
.then(() => {
    console.log("Synced db.");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
})


module.exports = {
    db,
    DB_PATH,
    DB_DIALECT
};
