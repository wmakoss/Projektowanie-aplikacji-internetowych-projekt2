
var testService = require('../services/test');

function get(req, res, next) {

    var test = testService.getTest();

    res.json(test);
}

module.exports = {
    get
};
