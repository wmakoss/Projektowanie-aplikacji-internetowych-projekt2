
var quiztest = require('./quiztest');
var questiontest = require('./questiontest');
var answertest = require('./answertest');

async function main() {
    await quiztest.runTests();
    await questiontest.runTests();
    await answertest.runTests();
}

main();
