
var testService = require('../services/test');

function get(req, res, next) {

    var test = testService.getTest();

    res.json(test);
}

async function get2(req, res, next) {

    var test2 = await testService.getTest2();

    res.json(test2);
}

async function get2a(req, res, next) {

    await testService.addTest2();
    var test2 = await testService.getTest2();

    res.json(test2);
}

module.exports = {
    get,
    get2,
    get2a
};
