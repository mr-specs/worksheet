const uri = "http://localhost:8080/api/alltasks/";
const usersuri = "http://localhost:8080/api/users/nonadmins";

var teamtask = [];
var userOnly = [];
var updateid = 0;

$(document).ready(function () {
  // Activate tooltip
  $('[data-toggle="tooltip"]').tooltip();
});
// init localstorage
function setteamtask() {
  if (localStorage) {
    localStorage.setItem("teamtaskList", JSON.stringify(teamtask));
  } else {
    alert("Sorry, your browser do not support local storage.");
  }
}
//log out clear session data
function logout() {
  sessionStorage.clear();
  alert("log out..");
  location.href = "login.html";
}
//connect db
function teamfun() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      _displayItems(JSON.parse(xhttp.responseText));
      console.log(JSON.parse(xhttp.responseText));
    }
  };
  xhttp.open("GET", uri, true);
  xhttp.send();
}
//login validation
function uservalidation() {

  var user = {
    id: 0,
    name: "Gowtham",
    password: "G@123",
    role: "",
  };

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // _displayItems(JSON.parse(xhttp.responseText));
      console.log(JSON.parse(xhttp.responseText));
    }
  };
  xhttp.open("POST", "http://localhost:8080/api/users/uservalidation", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(user));
}

function _displayItems(data) {
  $("#profileForm #userDropdown").length = 0;
  const tBody = document.getElementById("teambox");
  tBody.innerHTML = "";
  const button = document.createElement("button");

  data.forEach((item) => {
    let currEdit = `edititem(${item.id})`;
    let currDelete = `del(${item.id})`;

    let a = document.createElement("a");
    let aa = document.createElement("a");
    console.log(currEdit);
    let tr = tBody.insertRow();
    let td1 = tr.insertCell(0);
    let custid = document.createTextNode(item.id);
    td1.appendChild(custid);
    let td2 = tr.insertCell(1);
    let taskname = document.createTextNode(item.taskname);
    td2.appendChild(taskname);
    let td3 = tr.insertCell(2);
    let description = document.createTextNode(item.description);
    td3.appendChild(description);
    let td4 = tr.insertCell(3);
    let assignedto = document.createTextNode(item.assignedto);
    td4.appendChild(assignedto);
    let td5 = tr.insertCell(4);
    let assigneddate = document.createTextNode(item.assigneddate);
    td5.appendChild(assigneddate);
    let td6 = tr.insertCell(5);
    let duedate = document.createTextNode(item.duedate);
    td6.appendChild(duedate);
    let td7 = tr.insertCell(6);
    a.setAttribute("href", "#editTaskModal");
    a.setAttribute("class", "edit");
    a.setAttribute("data-toggle", "modal");
    a.setAttribute("onclick", currEdit);
    a.setAttribute("class", "material-icons");
    // a.setAttribute('data-toggle', 'tooltip');
    a.setAttribute("title", "Edit");
    a.innerHTML = "&#xE254;";
    td7.appendChild(a);

    let td8 = tr.insertCell(7);
    // td8.appendChild(deleteButton);
    aa.setAttribute("href", "#deleteTaskModal");
    aa.setAttribute("class", "delete");
    aa.setAttribute("data-toggle", "modal");
    aa.setAttribute('onclick', currDelete);
    aa.setAttribute("class", "material-icons");
    // aa.setAttribute("data-toggle", "tooltip");
    aa.setAttribute("title", "Delete");
    aa.innerHTML = "&#xE872;";
    td8.appendChild(aa);
  });
  teamtask = data;
  addOptions();
}

function addOptions() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      userOnly = JSON.parse(xhttp.responseText);
      console.log(JSON.parse(xhttp.responseText));
      console.log(userOnly);
      document.getElementById("userDropdown").innerHTML = "";
      console.log(userOnly.length);
      var select = document.getElementById("userDropdown");
      var option;
      for (var i = 0; i < userOnly.length; i++) {
        option = document.createElement("option");
        console.log(userOnly[i]["name"]);
        option.text = userOnly[i]["name"];
        select.add(option);
      }
    }
  };
  xhttp.open("GET", usersuri, true);
  xhttp.send();
}

function save() {
  var newteamtask = {
    taskname: document.getElementById("taskname").value,
    description: document.getElementById("description").value,
    assignedto: document.getElementById("userDropdown").value,
    assigneddate: document.getElementById("assigneddate").value,
    duedate: document.getElementById("duedate").value,
  };
  // console.log(index);
  console.log(newteamtask);
  teamtask.push(newteamtask);

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", uri, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(newteamtask));

  setteamtask();
  teamfun();
}
//show existing data in edit pop
function edititem(id) {
  //   alert(id);
  updateid = id;

  $("#profileForm #userDropdown").length = 0;
  $("#profileForm #userDropdown").empty();
  const item = teamtask.find((item) => item.id === id);
  $("#profileForm").find('[id="taskname"]').val(item.taskname);
  $("#profileForm").find('[id="description"]').val(item.description);
  // $("select[id$='profileForm #userDropdown']").val(item.assignedto);
  $("#profileForm")
    .find('[id="assigneddate"]')
    .val(new Date(item.assignedate).toISOString().slice(0, 10));
  $("#profileForm")
    .find('[id="duedate"]')
    .val(new Date(item.duedate).toISOString().slice(0, 10));

  var selectElem = $("#profileForm").find('[id="userDropdown"]');
  // Iterate over object and add options to select
  console.log(selectElem);

  $.each(userOnly, function (index, value) {
    $("<option/>", {
      value: index,
      text: userOnly[index].name,
    }).appendTo(selectElem);

    if (userOnly[index].name === item.assigneto) {
      console.log(userOnly[index].name + " = " + item.assigneto);
      $("#userDropdown option")
        .val(userOnly[index].name)
        .prop({
          selected: true
        });
    }
  });
}
//update the existing data
function update() {
  console.log("update " + updateid);

  var newteamtask = {
    id: updateid,
    taskname: $("#profileForm").find('[id="taskname"]').val(),
    description: $("#profileForm").find('[id="description"]').val(),
    assignedto: $("#profileForm #userDropdown option:selected").text(),
    assigneddate: $("#profileForm").find('[id="assigneddate"]').val(),
    duedate: $("#profileForm").find('[id="duedate"]').val()
  };

  console.log(newteamtask);

  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", uri + updateid, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(newteamtask));

  updateid = 0;
  teamfun();
}
//delete the data
function del(id) {
  teamtask.splice(id, 1);
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", uri + id, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  teamfun();
  setteamtask();
}

function htest() {
  $(".htoggler").prop("checked", false);
}
teamfun();