
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
        return false;
    }

    return true;
}

tests.push(addQuestion);

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
