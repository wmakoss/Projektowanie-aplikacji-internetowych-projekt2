var tests = [];

async function addQuestion() {

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
        return false;
    }

    var responseJson = await response.json();
    var quizPrivateID = responseJson["quizPrivateID"];

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

    return true;
}

tests.push(addQuestion);

async function getQuestions() {

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

    return true;
}

tests.push(getQuestions);

async function runTests() {
    console.log("Question tests:");
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
