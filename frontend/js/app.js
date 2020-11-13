$(document).ready(function(){
    document.getElementById("btnSubmitBody").addEventListener("click", recordInput);
  });

// API endpoints
var POST_processText_endpoint =  "https://c1ykal5srd.execute-api.us-east-1.amazonaws.com/dev/post-processtext"
var get_votes_endpoint = "https://c1ykal5srd.execute-api.us-east-1.amazonaws.com/dev/get-updatedtext/"

// Function to retrieve and validate input 
function recordInput() {  
    var serachID = document.getElementById("inputSearchID").value
    var textToProcess = document.getElementById("inputStringBody").value
    var find = document.getElementById("inputStringFind").value
    var replace = document.getElementById("inputStringReplace").value
    var caseSensativeCheck = document.getElementById("caseSensative").checked
    var replaceAllCheck = document.getElementById("replaceAll").checked

    if(serachID){
        getRequestByID(serachID)
        console.log(" | search UUID: " + serachID)
    }else{

        var email = "test@emial.com"
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

        processText(textToProcess, find, replace, email, caseSensativeCheck, replaceAllCheck);
        console.log(" | Text to process: " + textToProcess + " | Text to find: " + find + " | Text to replace: " + replace + " | Case sensative: " + caseSensativeCheck + " | Replace all: " + replaceAllCheck)
    }  
  }

// Function to POST input paramters to backend
async function processText(textToProcess, find, replace, email, caseSensativeCheck, replaceAllCheck) {
    
    try{
        const response = await fetch(POST_processText_endpoint, {
            method: "POST",
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email" : email,
                "textToProcess" : textToProcess,
                "find" : find ,
                "replace" : replace,
                "caseSensativeCheck" : caseSensativeCheck,
                "replaceAllCheck" : replaceAllCheck
            })
        });
        const result_json = await response.json()
        setOutputText(result_json)
    }catch(err){
        console.error("error", err);
    }   
}

// Function to get previous requests
async function getRequestByID(serachID) {
    try{
        const getPath = get_votes_endpoint + serachID
        const response = await fetch(getPath);
        const result_json = await response.json();
        setOutputText(result_json)
    }catch(err){
        console.error("error", err);
    }  
}

// Function to output the processed response
function setOutputText(result_json) {
    var JSONOutput = JSON.stringify(result_json);
    document.getElementById("outputStringFind").value = JSONOutput
}