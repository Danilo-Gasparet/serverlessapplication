$(document).ready(function(){
    //refreshVoteCounts()
    document.getElementById("btnSubmitBody").addEventListener("click", recordInput)
  });

// API endpoints
var POST_processText_endpoint =  "https://9p79fesj4b.execute-api.us-east-1.amazonaws.com/dev/post-processtext";
var get_votes_endpoint = "https://EXAMPLE_REPLACE_ME.execute-api.us-east-1.amazonaws.com/dev/votes";

// Function to retrieve and validate input 
function recordInput() {  
    var textToProcess = document.getElementById("inputStringBody").value
    var find = document.getElementById("inputStringFind").value
    var replace = document.getElementById("inputStringReplace").value
    var email = "test@emial.com";

    console.log("Text to process:" + textToProcess + "Text to find:" + find + "Text to replace:" + replace);

    if ( (typeof textToProcess) !== "string" || textToProcess==="")
    {
        alert("Please enter the text you would like to process!")
        return;
    }
    if ( (typeof find) !== "string" || find==="")
    {
        alert("Please enter the text you would like to find!")
        return;
    }
    if ( (typeof replace) !== "string" || replace==="")
    {
        alert("Please enter the text you would like to replace!")
        return;
    }
    if ( (typeof email) !== "string" || email==="")
    {
        alert("Please enter a valid email address!")
        return;
    }
    processText(textToProcess, find, replace, email);
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
function setOutputText(result_json) {
    var JSONOutput = JSON.stringify(result_json);
    document.getElementById("outputStringFind").value = JSONOutput
}