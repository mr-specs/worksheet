//user api is used
const uri = "http://localhost:8080/api/users/";

let allUsers = [];
let currentUser;
//connect the db data through xmlHttpRequest
function setData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            allUsers = JSON.parse(xhttp.responseText);
            console.log(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open("GET", uri, true);
    xhttp.send();

}
//validate the user login
function userValidation() {

    // allUsers = JSON.parse(localStorage.getItem("usersList") || "[]");
    console.log(allUsers.length);
    let uname = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    var useritem = {
        id: 0,
        name: uname,
        password: pass,
        role: "",
    };

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert();
            // _displayItems(JSON.parse(xhttp.responseText));
            console.log(JSON.parse(xhttp.responseText));
            currentUser = JSON.parse(xhttp.responseText);
            console.log(currentUser);
            getCurrentUser(currentUser);
        }
    };
    xhttp.open("POST", "http://localhost:8080/api/users/uservalidation", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(useritem));


}
//redirecting page based on user
function getCurrentUser(curuser) {
    console.log(curuser);

    console.log(curuser[0].role);
    // if(checkIfVerifiedExists(currentUser.role == 'A')) {
    if (curuser[0].role == 'U') {
        console.log("Object is empty");
        sessionStorage.setItem("loginuser", curuser[0].name);
        window.location.href = "userhome.html";
    }
    if (curuser[0].role == 'A') {
        console.log("Object is not empty");
        sessionStorage.setItem("loginuser", curuser[0].name);
        window.location.href = "adminhome.html";
    }

}