$(document).ready(function(){
    //refreshVoteCounts()
    document.getElementById("btnSubmitBody").addEventListener("click", recordInput);
  });

// API endpoints
var POST_processText_endpoint = "https://EXAMPLE_REPLACE_ME.execute-api.us-east-1.amazonaws.com/dev/song/vote"
var get_votes_endpoint = "https://EXAMPLE_REPLACE_ME.execute-api.us-east-1.amazonaws.com/dev/votes"

// Function to retrieve and validate input 
function recordInput() {  
    var textToProcess = document.getElementsById("inputStringBody").innerText
    var find = document.getElementsById("inputStringFind").innerText
    var replace = document.getElementsById("inputStringReplace").innerText
    var email = "test@emial.com"
    if ( (typeof textToProcess) !== "string")
    {
        alert("Please enter the text you would like to process!")
    }
    if ( (typeof find) !== "string")
    {
        alert("Please enter the text you would like to find!")
    }
    if ( (typeof replace) !== "string")
    {
        alert("Please enter the text you would like to replace!")
    }
    if ( (typeof email) !== "string")
    {
        alert("Please enter a valid email address!")
    }
    processText(textToProcess, find, replace, email)
    console.log("Text to process:" + textToProcess + "Text to find:" + find + "Text to replace:" + replace)
  }

// Function to POST input paramters to backend
async function processText(textToProcess, find, replace, email) {
    const response = await fetch(POST_processText_endpoint, {
    method: "POST",
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "email" : email,
        "textToProcess" : textToProcess,
        "find" : find ,
        "replace" : replace
    })
})
const result_json = await response.json()
setOutputText(result_json)
}

// Function to output the processed response
function setVotes(result_json) {
    var JSONOutput = JSON.stringify(result_json)
    document.getElementsById("inputStringFind").innerText = JSONOutput;
}