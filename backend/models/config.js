
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

db.quiz = sequelize.define("quiz", {
    UUID: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    publicID: {
        type: Sequelize.STRING
    },
    privateID: {
        type: Sequelize.STRING
    }
});

db.question = sequelize.define("question", {
    UUID: {
        type: Sequelize.STRING
    },
    quizID: {
        type: Sequelize.STRING
    },
    question: {
        type: Sequelize.STRING
    },
    answer1: {
        type: Sequelize.STRING
    },
    answer2: {
        type: Sequelize.STRING
    },
    answer3: {
        type: Sequelize.STRING
    },
    answer4: {
        type: Sequelize.STRING
    },
    correct: {
        type: Sequelize.INTEGER
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
