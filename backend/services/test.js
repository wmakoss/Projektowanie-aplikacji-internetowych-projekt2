
var testModel = require('../models/test');
var test2Model = require('../models/test2');

function getTest() {
    return testModel.getTest();
}

async function getTest2() {
    return await test2Model.getAll();
}

async function addTest2() {
    return await test2Model.add("adam", "adam@example.com");
}

module.exports = {
    getTest,
    getTest2,
    addTest2
};
