
var quiztest = require('./quiztest');
var questiontest = require('./questiontest');

async function main() {
    await quiztest.runTests();
    await questiontest.runTests();
}

main();
