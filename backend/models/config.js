
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

db.quiz = sequelize.define("quiz", {
    quizPublicID: {
        type: Sequelize.STRING
    },
    quizPrivateID: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    }
});

db.question = sequelize.define("question", {
    questionPublicID: {
        type: Sequelize.STRING
    },
    questionPrivateID: {
        type: Sequelize.STRING
    },
    quizPublicID: {
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

db.answer = sequelize.define("answer", {
    answerPublicID: {
        type: Sequelize.STRING
    },
    answerPrivateID: {
        type: Sequelize.STRING
    },
    quizPublicID: {
        type: Sequelize.STRING
    },
    userName: {
        type: Sequelize.STRING
    }
});

db.answerItem = sequelize.define("answerItem", {
    answerPublicID: {
        type: Sequelize.STRING
    },
    questionPublicID: {
        type: Sequelize.STRING
    },
    answer: {
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
