var AllWorklogs = JSON.parse(localStorage.getItem("workLogList") || "[]");
let loginuser = sessionStorage.getItem("loginuser");
var worklogs = AllWorklogs.filter(person => person.Employee_name === loginuser);
updateindex = 0;
// localStorage.setItem("teamtaskList", JSON.stringify(teamtask));

$(document).ready(function () {
  //   });
  // Activate tooltip
  $('[data-toggle="tooltip"]').tooltip();
  // Select/Deselect checkboxes
  var checkbox = $('table tbody input[type="checkbox"]');
  $("#selectAll").click(function () {
    if (this.checked) {
      checkbox.each(function () {
        this.checked = true;
      });
    } else {
      checkbox.each(function () {
        this.checked = false;
      });
    }
  });
  checkbox.click(function () {
    if (!this.checked) {
      $("#selectAll").prop("checked", false);
    }
  });
});

function setteamtask() {
  if (localStorage) {
    localStorage.setItem("workLogList", JSON.stringify(AllWorklogs));
  } else {
    alert("Sorry, your browser do not support local storage.");
  }
}

function logout() {
  sessionStorage.clear();
  alert("log out..");
  location.href = "login.html";
}

function teamfun() {
  document.getElementById("name").value = loginuser;
  $("#profileForm #name").length = 0;

  document.getElementById('name').readOnly = true;
  console.log(worklogs.length);
  // alert();
  var html = "";
  for (var i = 0; i < worklogs.length; i++) {
    var currEdit = "edit(" + i + ")";
    var currDelete = "del(" + i + ")";
    html += "<tr>";
    // html +=
    //   "<td><span class='custom-checkbox'>  <input    type='checkbox'    id='checkbox1'    name='options[]'    value='1'  />  <label for='checkbox1'></label></span></td>";
    html +=
      "<td>" + worklogs[i].Employee_name +
      "<td>" + worklogs[i].taskname +
      "<td>" + worklogs[i].date +
      "<td>" + worklogs[i].starttime +
      "<td>" + worklogs[i].endtime + "<td>" +
      worklogs[i].status + "</td>";
    html +=
      "<td><a href='#editTaskModal' class='edit' data-toggle='modal'  onclick=" +
      currEdit + ">";
    html +=
      "<i    class='material-icons'    data-toggle='tooltip'    title='Edit'>&#xE254;</i  ></a>";
    html +=
      "<a  href='#deleteTaskModal'  class='delete'  data-toggle='modal'  onclick=" +
      currDelete +
      ">";
    html +=
      "<i    class='material-icons'    data-toggle='tooltip'    title='Delete'    >&#xE872;</i  ></a>      </td>";
    html += "</tr>";
  }
  document.getElementById("teambox").innerHTML = html;
  addOptions();
  myFunction1('1');
}

function addOptions() {
  document.getElementById("taskDropdown").innerHTML = "";
  $("#profileForm #taskDropdown").length = 0;

  var jsonArray = JSON.parse(localStorage.getItem("teamtaskList") || "[]");
  var mytasks = jsonArray.filter(person => person.assignedto === loginuser);
  var select = document.getElementById("taskDropdown");
  var option;
  for (var i = 0; i < mytasks.length; i++) {
    option = document.createElement('option');
    option.text = mytasks[i]["taskname"];
    select.add(option);
  }
  console.log(select)
}

function save() {
  var newtime = {
    Employee_name: document.getElementById("name").value,
    taskname: document.getElementById("taskDropdown").value,
    date: document.getElementById("date").value,
    starttime: document.getElementById("startingtime").value,
    endtime: document.getElementById("endingtime").value,
    status: document.getElementById("status").value,
  };
  // console.log(index);
  worklogs.push(newtime);
  AllWorklogs.push(newtime);
  setteamtask();
  taskfun();
}

function edit(i) {
  
  $('#profileForm #taskDropdown')[0].options.length = 0;
  var jsonArray = JSON.parse(localStorage.getItem("teamtaskList") || "[]");
  var userOnly = jsonArray.filter(person => person.assignedto === loginuser);
  // console.log(userOnly)
  var selectElem = $("#profileForm").find('[id="taskDropdown"]');
  console.log(selectElem)
  // Iterate over object and add options to select
  $.each(userOnly, function (index, value) {
    $("<option/>", {
      value: index,
      text: userOnly[index].taskname,
    }).appendTo(selectElem);
    // console.log(selectElem);
    if (userOnly[index].taskname === jsonArray[i].taskname) {
      console.log(userOnly[index].taskname + " = " + jsonArray[i].taskname);
      // $("#profileForm #userDropdown").text(teamtask[i].assignedto).prop({selected: true});
      // $('#userDropdown option').val("Vishnu")
      $('#taskDropdown option').val(jsonArray[i].taskname).prop({
        selected: true
      });
      // .removeAttr('selected')
      // .filter('[value='+teamtask[i].assignedto+']')
      // .attr('selected', true);
    }
  });
 
  $("#profileForm").find('[id="name"]').val(worklogs[i].Employee_name);
  $("select[id$='profileForm #taskDropdown']").val(worklogs[i].taskname);
  console.log(worklogs[i].starttime);
  $("#profileForm").find('[id="date"]').val(worklogs[i].date);
  $("#profileForm").find('[id="startingtime"]').val(worklogs[i].starttime);
  $("#profileForm").find('[id="endingtime"]').val(worklogs[i].endtime);
  $("#profileForm").find('[id="status"]').val(worklogs[i].status);
  console.log($("#profileForm").find('[id="status"]').val(worklogs[i].status))
  // document.getElementById("description").value = teamtask[i].description;
  // document.getElementById("userDropdown").value = teamtask[i].assignedto;
  // document.getElementById("assignedate").value = teamtask[i].assignedate;
  // document.getElementById("duedate").value = teamtask[i].duedate;
  // document.getElementById('button').innerHTML = "Update";
  updateindex = i;
  //console.log(updateindex);
}

function update() {
  console.log("update " + updateindex);
  // e1 = document.getElementById("taskname");
  // var id = e1.value;
  worklogs[updateindex].Employee_name = $("#profileForm")
    .find('[id="name"]')
    .val();
  worklogs[updateindex].taskname = $(
    "#profileForm #taskDropdown option:selected"
  ).text();
  // var selectElem = $("#profileForm").find('[id="userDropdown"]');
  // $("#yourdropdownid option:selected").text();
  worklogs[updateindex].date = $("#profileForm")
    .find('[id="date"]')
    .val();
  worklogs[updateindex].starttime = $("#profileForm")
    .find('[id="startingtime"]')
    .val();
  worklogs[updateindex].endtime = $("#profileForm")
    .find('[id="endingtime"]')
    .val();
  worklogs[updateindex].status = $("#profileForm")
    .find('[id="status"]')
    .val();
  console.log($("#profileForm")
    .find('[id="status"]')
    .val());
  document.getElementById("name").value = "";
  document.getElementById("taskDropdown").value = "";
  document.getElementById("date").value = '';
  document.getElementById("startingtime").value = "";
  document.getElementById("endingtime").value = "";
  document.getElementById("status").value = "";
  console.log(AllWorklogs[updateindex].status = $("#profileForm")
    .find('[id="status"]')
    .val())
  // document.getElementById('button').innerHTML = 'Add';
  teamfun();
  setteamtask();
}

function del(i) {
  console.log(i);
  // AllWorklogs.splice(i, 1);
  worklogs.splice(i, 1);
  teamfun();
  setteamtask();
}

function utest() {
  $(".htoggler").prop("checked", false);
}


function myFunction1(curDiv) {

  var x = document.getElementById(curDiv);
  if (curDiv === "1") {
    // alert("er")

    document.getElementById("inprocessboxTable").style.display = "none";
    // document.getElementById("taskSummary").style.display = "none";
    document.getElementById("worklogSummary").style.display = "block";
  }

  if (curDiv === "inprocessboxTable") {

    document.getElementById("inprocessboxTable").style.display = "block";
    // document.getElementById("taskSummary").style.display = "none";
    document.getElementById("worklogSummary").style.display = "block";
  }
  // if (curDiv === "taskSummary") {

  //   document.getElementById("searchBox").style.display = "none";
  //   document.getElementById("taskSummary").style.display = "block";
  //   document.getElementById("statusTable").style.display = "block";
  // }

  utest();
}