
var sqlite = require('better-sqlite3');

var config = require('./config');

function getTest() {
    var db = sqlite(config.DB_PATH);

    var rows = db.prepare("SELECT * FROM test;").all();

    db.close();

    return rows;
}

module.exports = {
    getTest
};
