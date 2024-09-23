
var tests = [];

async function sendAnswer() {
    var response = await fetch("http://localhost:8080/quiz/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({name: "testowa nazwa!!"})
          
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /quiz/create response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var quizPrivateID = responseJson["quizPrivateID"];
    var quizPublicID = responseJson["quizPublicID"];

    var response = await fetch("http://localhost:8080/question/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                    quizPrivateID: quizPrivateID,
                    question: "2+2+2+2",
                    answer1: "12",
                    answer2: "4",
                    answer3: "8",
                    answer4: "",
                    correct: 3
                }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /question/create response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var questionPublicID1 = await responseJson["questionPublicID"];

    var response = await fetch("http://localhost:8080/question/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                    quizPrivateID: quizPrivateID,
                    question: "12-2",
                    answer1: "12",
                    answer2: "4",
                    answer3: "8",
                    answer4: "10",
                    correct: 4
                }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /question/create response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var questionPublicID2 = await responseJson["questionPublicID"];

    var response = await fetch("http://localhost:8080/question/getQuestionsByquizPublicID",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                quizPublicID: quizPublicID
              }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /question/getQuestionsByquizPublicID response status is not 200!");
        return false;
    }

    var expextedResponse = JSON.stringify([
        {
          questionPublicID: questionPublicID1,
          question: '2+2+2+2',
          answer1: '12',
          answer2: '4',
          answer3: '8',
          answer4: ''
        },
        {
          questionPublicID: questionPublicID2,
          question: '12-2',
          answer1: '12',
          answer2: '4',
          answer3: '8',
          answer4: '10'
        }
      ]);

    var responseJson = await response.json();

    if (JSON.stringify(responseJson) != expextedResponse) {
        console.log("/question/getQuestionsByquizPublicID:");
        console.log("Response:");
        console.log(JSON.stringify(responseJson));
        console.log("expextedResponse:");
        console.log(expextedResponse);
        return false;
    }


    var response = await fetch("http://localhost:8080/answer/send",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                userName: "exampleUserName",
                quizPublicID: quizPublicID,
                answers:
                [
                    {
                        questionPublicID: questionPublicID1,
                        answer: 3
                    },
                    {
                        questionPublicID: questionPublicID2,
                        answer: 3
                    }
                ]
            }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /answer/send response status is not 200!");
        return false;
    }

    return true;
}

tests.push(sendAnswer);

async function checkAnswerScore() {
    var response = await fetch("http://localhost:8080/quiz/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({name: "testowa nazwa!!"})
          
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /quiz/create response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var quizPrivateID = responseJson["quizPrivateID"];
    var quizPublicID = responseJson["quizPublicID"];

    var response = await fetch("http://localhost:8080/question/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                    quizPrivateID: quizPrivateID,
                    question: "2+2+2+2",
                    answer1: "12",
                    answer2: "4",
                    answer3: "8",
                    answer4: "",
                    correct: 3
                }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /question/create response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var questionPublicID1 = await responseJson["questionPublicID"];

    var response = await fetch("http://localhost:8080/question/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                    quizPrivateID: quizPrivateID,
                    question: "12-2",
                    answer1: "12",
                    answer2: "4",
                    answer3: "8",
                    answer4: "10",
                    correct: 4
                }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /question/create response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var questionPublicID2 = await responseJson["questionPublicID"];

    var response = await fetch("http://localhost:8080/question/getQuestionsByquizPublicID",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                quizPublicID: quizPublicID
              }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /question/getQuestionsByquizPublicID response status is not 200!");
        return false;
    }

    var expextedResponse = JSON.stringify([
        {
          questionPublicID: questionPublicID1,
          question: '2+2+2+2',
          answer1: '12',
          answer2: '4',
          answer3: '8',
          answer4: ''
        },
        {
          questionPublicID: questionPublicID2,
          question: '12-2',
          answer1: '12',
          answer2: '4',
          answer3: '8',
          answer4: '10'
        }
      ]);

    var responseJson = await response.json();

    if (JSON.stringify(responseJson) != expextedResponse) {
        console.log("/question/getQuestionsByquizPublicID:");
        console.log("Response:");
        console.log(JSON.stringify(responseJson));
        console.log("expextedResponse:");
        console.log(expextedResponse);
        return false;
    }


    var response = await fetch("http://localhost:8080/answer/send",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                userName: "exampleUserName",
                quizPublicID: quizPublicID,
                answers:
                [
                    {
                        questionPublicID: questionPublicID1,
                        answer: 3
                    },
                    {
                        questionPublicID: questionPublicID2,
                        answer: 3
                    }
                ]
            }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /answer/send response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var answerPrivateID = await responseJson["answerPrivateID"];

    var response = await fetch("http://localhost:8080/answer/checkScore",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                answerPrivateID: answerPrivateID
            }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /answer/checkScore response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var score = await responseJson["score"];
    var expextedScore = 1;

    if (score != expextedScore) {
        console.log("/answer/checkScore:");
        console.log("score:");
        console.log(score);
        console.log("expextedScore:");
        console.log(expextedScore);
        return false;
    }

    return true;
}

tests.push(checkAnswerScore);

async function reviewAnswer() {
    var response = await fetch("http://localhost:8080/quiz/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({name: "testowa nazwa!!"})
          
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /quiz/create response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var quizPrivateID = responseJson["quizPrivateID"];
    var quizPublicID = responseJson["quizPublicID"];

    var response = await fetch("http://localhost:8080/question/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                    quizPrivateID: quizPrivateID,
                    question: "2+2+2+2",
                    answer1: "12",
                    answer2: "4",
                    answer3: "8",
                    answer4: "",
                    correct: 3
                }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /question/create response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var questionPublicID1 = await responseJson["questionPublicID"];

    var response = await fetch("http://localhost:8080/question/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                    quizPrivateID: quizPrivateID,
                    question: "12-2",
                    answer1: "12",
                    answer2: "4",
                    answer3: "8",
                    answer4: "10",
                    correct: 4
                }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /question/create response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var questionPublicID2 = await responseJson["questionPublicID"];

    var response = await fetch("http://localhost:8080/question/getQuestionsByquizPublicID",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                quizPublicID: quizPublicID
              }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /question/getQuestionsByquizPublicID response status is not 200!");
        return false;
    }

    var expextedResponse = JSON.stringify([
        {
          questionPublicID: questionPublicID1,
          question: '2+2+2+2',
          answer1: '12',
          answer2: '4',
          answer3: '8',
          answer4: ''
        },
        {
          questionPublicID: questionPublicID2,
          question: '12-2',
          answer1: '12',
          answer2: '4',
          answer3: '8',
          answer4: '10'
        }
      ]);

    var responseJson = await response.json();

    if (JSON.stringify(responseJson) != expextedResponse) {
        console.log("/question/getQuestionsByquizPublicID:");
        console.log("Response:");
        console.log(JSON.stringify(responseJson));
        console.log("expextedResponse:");
        console.log(expextedResponse);
        return false;
    }


    var response = await fetch("http://localhost:8080/answer/send",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                userName: "exampleUserName",
                quizPublicID: quizPublicID,
                answers:
                [
                    {
                        questionPublicID: questionPublicID1,
                        answer: 3
                    },
                    {
                        questionPublicID: questionPublicID2,
                        answer: 3
                    }
                ]
            }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /answer/send response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var answerPrivateID = await responseJson["answerPrivateID"];

    var response = await fetch("http://localhost:8080/answer/reviewAnswer",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                answerPrivateID: answerPrivateID
            }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /answer/reviewAnswer response status is not 200!");
        return false;
    }

    var responseJson = await response.json();

    var expextedResponse = JSON.stringify({
        quizPublicID: quizPublicID,
        userName: 'exampleUserName',
        score: 1,
        answers: [
          {
            question: '2+2+2+2',
            answer1: '12',
            answer2: '4',
            answer3: '8',
            answer4: '',
            userAnswer: 3,
            correct: 3,
            score: 1
          },
          {
            question: '12-2',
            answer1: '12',
            answer2: '4',
            answer3: '8',
            answer4: '10',
            userAnswer: 3,
            correct: 4,
            score: 0
          }
        ]
      });

    if (JSON.stringify(responseJson) != expextedResponse) {
        console.log("/question/reviewAnswer:");
        console.log("Response:");
        console.log(JSON.stringify(responseJson));
        console.log("expextedResponse:");
        console.log(expextedResponse);
        return false;
    }

    return true;
}

tests.push(reviewAnswer);

async function getAnswersByQuizPrivateID() {
    var response = await fetch("http://localhost:8080/quiz/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({name: "testowa nazwa!!"})
          
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /quiz/create response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var quizPrivateID = responseJson["quizPrivateID"];
    var quizPublicID = responseJson["quizPublicID"];

    var response = await fetch("http://localhost:8080/question/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                    quizPrivateID: quizPrivateID,
                    question: "2+2+2+2",
                    answer1: "12",
                    answer2: "4",
                    answer3: "8",
                    answer4: "",
                    correct: 3
                }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /question/create response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var questionPublicID1 = await responseJson["questionPublicID"];

    var response = await fetch("http://localhost:8080/question/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                    quizPrivateID: quizPrivateID,
                    question: "12-2",
                    answer1: "12",
                    answer2: "4",
                    answer3: "8",
                    answer4: "10",
                    correct: 4
                }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /question/create response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var questionPublicID2 = await responseJson["questionPublicID"];

    var response = await fetch("http://localhost:8080/question/getQuestionsByquizPublicID",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                quizPublicID: quizPublicID
              }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /question/getQuestionsByquizPublicID response status is not 200!");
        return false;
    }

    var expextedResponse = JSON.stringify([
        {
          questionPublicID: questionPublicID1,
          question: '2+2+2+2',
          answer1: '12',
          answer2: '4',
          answer3: '8',
          answer4: ''
        },
        {
          questionPublicID: questionPublicID2,
          question: '12-2',
          answer1: '12',
          answer2: '4',
          answer3: '8',
          answer4: '10'
        }
      ]);

    var responseJson = await response.json();

    if (JSON.stringify(responseJson) != expextedResponse) {
        console.log("/question/getQuestionsByquizPublicID:");
        console.log("Response:");
        console.log(JSON.stringify(responseJson));
        console.log("expextedResponse:");
        console.log(expextedResponse);
        return false;
    }


    var response = await fetch("http://localhost:8080/answer/send",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                userName: "exampleUserName",
                quizPublicID: quizPublicID,
                answers:
                [
                    {
                        questionPublicID: questionPublicID1,
                        answer: 3
                    },
                    {
                        questionPublicID: questionPublicID2,
                        answer: 3
                    }
                ]
            }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /answer/send response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var answerPrivateID = await responseJson["answerPrivateID"];

    var response = await fetch("http://localhost:8080/quiz/getAnswersByQuizPrivateID",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                quizPrivateID: quizPrivateID
            }
            )
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /quiz/getAnswersByQuizPrivateID response status is not 200!");
        return false;
    }

    var responseJson = await response.json();

    var expextedResponse = JSON.stringify([
        {
          quizName: 'testowa nazwa!!',
          score: 1,
          numberOfQuestions: 2,
          answerPrivateID: answerPrivateID,
          quizPublicID: quizPublicID,
          userName: 'exampleUserName'
        }
      ]);

    if (JSON.stringify(responseJson) != expextedResponse) {
        console.log("/quiz/getAnswersByQuizPrivateID:");
        console.log("Response:");
        console.log(JSON.stringify(responseJson));
        console.log("expextedResponse:");
        console.log(expextedResponse);
        return false;
    }

    return true;
}

tests.push(getAnswersByQuizPrivateID);

async function runTests() {
    console.log("Answer tests:");
    for(var i=0;i<tests.length;i++) {
        if (await tests[i]()) {
            console.log("Test " + (i+1) + " OK");
        } else {
            console.log("Test " + (i+1) + " FAILED");
        }
    }
}

module.exports = {
    runTests
};
