//var created to store data in local storage
let allUsers = JSON.parse(localStorage.getItem("usersList") || "[]");
let teamtask = JSON.parse(localStorage.getItem("teamtaskList") || "[]");
let worklogs = JSON.parse(localStorage.getItem("workLogList") || "[]");
var obj;
// log out function
function logout() {
  sessionStorage.clear();
  alert("log out..")
  location.href = "login.html"
}
//
function data() {
  worklogs.filter(x => x.status === "Completed").length
  obj = {
    "totalTask": teamtask.length,
    "completedTask": worklogs.filter(x => x.status === "Completed").length,
    // "incompletedTask":worklogs.filter(x=>x.status==="Inprogress").length,
    "incompletedTask": worklogs.filter(x => x.status === "Inprogress").length,

    "taskExceededDueDate": 2
  };

}
//get los from the db and display in table formate in html
function getLogs() {
  var html = "";
  for (var i = 0; i < worklogs.length; i++) {
    html += "<tr>";
    html +=
      "<td>" +
      worklogs[i].Employee_name +
      "<td>" +
      worklogs[i].taskname +
      "<td>" +
      worklogs[i].date +
      "<td>" +
      worklogs[i].starttime +
      "<td>" +
      worklogs[i].endtime +
      "<td>" +
      worklogs[i].status +
      "</td>";
    html += "</tr>";
  }
  document.getElementById("logs").innerHTML = html;
  addOptions();
  data();
  document.getElementById("data1").innerHTML = obj.totalTask;
  document.getElementById("data2").innerHTML = obj.completedTask;
  document.getElementById("data3").innerHTML = obj.incompletedTask;
  document.getElementById("data4").innerHTML = obj.taskExceededDueDate;
  // +"\n"+obj.incompletedTask +obj.taskExceededDueDate
  myFunction('1');
}
//used to create a dropdown which contains non admin list
function addOptions() {
  document.getElementById("userDropdown").innerHTML = "";
  $("#profileForm #userDropdown").length = 0;

  var jsonArray = JSON.parse(localStorage.getItem("usersList") || "[]");
  var userOnly = jsonArray.filter((person) => person.role === "U");

  var select = document.getElementById("userDropdown");
  var option;
  for (var i = 0; i < userOnly.length; i++) {
    option = document.createElement("option");
    option.text = userOnly[i]["username"];
    select.add(option);
    console.log(option)
  }
}
//init localstorage
function setteamtask() {
  if (localStorage) {
    localStorage.setItem("teamtaskList", JSON.stringify(teamtask));
    // console.log(JSON.parse(localStorage.getItem("teamtaskList") || "[]"));
  } else {
    alert("Sorry, your browser do not support local storage.");
  }
}
// used to save data in db
function save() {
  var newteamtask = {
    taskname: document.getElementById("taskname").value,
    description: document.getElementById("description").value,
    assignedto: document.getElementById("userDropdown").value,
    assignedate: document.getElementById("assignedate").value,
    duedate: document.getElementById("duedate").value,


  };
  // console.log(index);
  console.log(newteamtask);
  teamtask.push(newteamtask);
  setteamtask();
  teamfun();
}
//search function 
function performSearch() {
  // Declare variables
  var input, filter, table, tr, i, j, column_length, count_td;
  column_length = document.getElementById("myTable").rows[0].cells.length;
  input = document.getElementById("searchBoxText");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    // except first(heading) row
    count_td = 0;
    for (j = 0; j < column_length - 1; j++) {
      // except first column
      td = tr[i].getElementsByTagName("td")[j];
      /* ADD columns here that you want you to filter to be used on */
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          count_td++;
        }
      }
    }
    if (count_td > 0) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}
//hide hambuger menu
function Atest() {
  $(".htoggler").prop("checked", false);
}

//hide dom elements
function myFunction(curDiv) {

  var x = document.getElementById(curDiv);
  if (curDiv === "1") {

    document.getElementById("searchBox").style.display = "none";
    document.getElementById("taskSummary").style.display = "none";
    document.getElementById("statusTable").style.display = "block";
  }

  if (curDiv === "searchBox") {

    document.getElementById("searchBox").style.display = "block";
    document.getElementById("taskSummary").style.display = "none";
    document.getElementById("statusTable").style.display = "block";
  }
  if (curDiv === "taskSummary") {

    document.getElementById("searchBox").style.display = "none";
    document.getElementById("taskSummary").style.display = "block";
    document.getElementById("statusTable").style.display = "block";
  }

  Atest();
}