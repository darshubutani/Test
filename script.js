let form = document.getElementById("form");
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let pswdInput = document.getElementById("pswdInput");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let update = document.getElementById("update");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (nameInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let acceptData = () => {

  //Add data api
  fetch('https://crudcrud.com/api/487b692dac6a4447a5c5e9fb6e98dbc4/data', {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'POST',
    body: JSON.stringify({
      name: nameInput.value,
      Email: emailInput.value,
      password: pswdInput.value,
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
  resetForm();
};

let createTasks = (data) => {

  console.log(data);
  data.map((x, index) => {
    return (tasks.innerHTML += `
  <div id=${index}>
        
        <p>${x.name}</p>
        <p>${x.Email}</p>
        <p>${x.password}</p>
        <p>${x._id}</p>

        <span class="options">
          <i onClick= "editTask(this,'${x._id}')" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
          <i onClick ="deleteTask(this,'${x._id}');" class="fas fa-trash-alt"></i>
        </span>
      </div>
  `);
  });

  resetForm();
};


let deleteTask = (e, id) => {

  confirm('Are you sure to delete this record ?')
  e.parentElement.parentElement.remove();

  fetch(`https://crudcrud.com/api/487b692dac6a4447a5c5e9fb6e98dbc4/data/${id}`,
    {
      method: 'DELETE'
    })
    .then(response => console.log(response))
};

let editTask = (e, id) => {

  let selectedTask = e.parentElement.parentElement;
  nameInput.value = selectedTask.children[0].innerHTML;
  emailInput.value = selectedTask.children[1].innerHTML;
  pswdInput.value = selectedTask.children[2].innerHTML;
  window.confirm = function () { return false; };


  // Update database using unique id  
  // fetch(
  //   `https://crudcrud.com/api/487b692dac6a4447a5c5e9fb6e98dbc4/data/${id}`, {
  //     headers: { "Content-Type": "application/json; charset=utf-8" },
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       name: nameInput.value,
  //       Email: emailInput.value,
  //       password:pswdInput.value,
  //     })
  //   })
  //   .then(response => console.log(response))

  deleteTask(e, id);
};

let resetForm = () => {
  nameInput.value = "";
  emailInput.value = "";
  pswdInput.value = "";
};

//IIFE to display data 
(() => {

  database = fetch('https://crudcrud.com/api/487b692dac6a4447a5c5e9fb6e98dbc4/data')
    .then(response => response.json())
    .then(data => createTasks(data));

})();
