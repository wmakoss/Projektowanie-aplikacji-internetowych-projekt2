
var tests = [];

async function createTest() {

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

    return true;
}

tests.push(createTest);

async function createTestAncCheckName() {

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
    var quizPublicID = responseJson["quizPublicID"];

    var response = await fetch("http://localhost:8080/quiz/getNameByQuizPublicID",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({quizPublicID: quizPublicID})
        }
    );

    if (response.status != 200) {
        console.log("Endpoint /quiz/getNameByQuizPublicID response status is not 200!");
        return false;
    }

    var responseJson = await response.json();
    var quizName = responseJson["quizName"];

    if (quizName != "testowa nazwa!!") {
        return false;
    }

    return true;
}

tests.push(createTestAncCheckName);

async function runTests() {
    console.log("Quiz tests:");
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
