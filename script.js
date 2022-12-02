/////
const InputNameS = document.getElementById('signupName');
const InputEmailS = document.getElementById('signupEid');
const InputPswdS = document.getElementById('signupPswd');
const signupBtn = document.querySelector('.submit-btn');
const btnlogin = document.getElementById('btnLogin');
const InputEmailL = document.getElementById('LoginEid');
const InputPswdL = document.getElementById('LoginPswd');
const containerApp = document.querySelector('.form-structor');
const containerLogin = document.querySelector('.center');
const containerSignup = document.querySelector('.signup');
const appContainer = document.querySelector('.app');
let btnlogout = document.getElementById("logout");
let btnLogin2 = document.getElementById("btnLogin2");
appContainer.style.opacity = 0;
containerLogin.style.opacity = 0;
////


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
  fetch('https://crudcrud.com/api/15288cbfa85d4ce986872edd6a2f87da/data', {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'POST',
    body: JSON.stringify({
      name: nameInput.value || InputNameS.value,
      Email: emailInput.value || InputEmailS.value,
      password: pswdInput.value || InputPswdS.value,
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
  resetForm();

};

let createTasks = (data) => {
  add.style.opacity = 100;
  update.style.opacity = 0;

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

  fetch(`https://crudcrud.com/api/15288cbfa85d4ce986872edd6a2f87da/data/${id}`,
    {
      method: 'DELETE'
    })
    .then(response => console.log(response))
};

let editTask = (e, id) => {
  update.style.opacity = 100;
  add.style.opacity = 0;
  let selectedTask = e.parentElement.parentElement;
  nameInput.value = selectedTask.children[0].innerHTML;
  emailInput.value = selectedTask.children[1].innerHTML;
  pswdInput.value = selectedTask.children[2].innerHTML;


  update.addEventListener('click', function (ev) {
    ev.preventDefault();

    //Update database using unique id  
    fetch(
      `https://crudcrud.com/api/15288cbfa85d4ce986872edd6a2f87da/data/${id}`, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'PUT',
      body: JSON.stringify({
        name: nameInput.value,
        Email: emailInput.value,
        password: pswdInput.value,
      })
    })
      .then(response => console.log(response))
    window.confirm = function () { return false; };
  })


  // deleteTask(e, id);
};

let resetForm = () => {
  nameInput.value = "";
  emailInput.value = "";
  pswdInput.value = "";
  InputNameS.value = "";
  InputEmailS.value = "";
  InputPswdS.value = "";
  InputPswdL.value = "";
  InputEmailL.value = "";
};

//IIFE to display data 
(() => {


  if (localStorage.login == 1) {
    console.log('already Logged in ');
    containerApp.style.opacity = 0;
    containerSignup.style.opacity = 0;
    containerLogin.style.opacity = 0;
    appContainer.style.opacity = 100;
  }
  else {
    console.log("Login first");
  }

  database = fetch('https://crudcrud.com/api/15288cbfa85d4ce986872edd6a2f87da/data')
    .then(response => response.json())
    .then(data => createTasks(data));

})();


/////////////////////////
signupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log("Hello signup");
  localStorage.login = 1;
  containerApp.style.opacity = 0;
  appContainer.style.opacity = 100;
  containerSignup.style.opacity = 0;

  acceptData();
});

let temp;
btnlogin.addEventListener('click', function (e) {
  e.preventDefault();

  (() => {


    fetch('https://crudcrud.com/api/15288cbfa85d4ce986872edd6a2f87da/data')
      .then(response => response.json())
      .then(data => loginData(data));

  })();

  let loginData = (data) => {
    console.log(data);

    temp = data.find(o => o.Email == InputEmailL.value);
    console.log(temp);
    if (data.find(o => o.Email == InputEmailL.value)) {
      if ((temp.password) === (InputPswdL.value)) {
        console.log('LogIN');
        localStorage.login = 1;
        containerApp.style.opacity = 0;
        containerSignup.style.opacity = 0;
        containerLogin.style.opacity = 0;
        appContainer.style.opacity = 100;
      }
      else {
        alert("Incorrect password")
      }
    }
    else {
      alert("Account not found");
    }
  }
});


btnlogout.addEventListener('click', function (e) {
  e.preventDefault();
  localStorage.login = 0;
  containerApp.style.opacity = 100;
  appContainer.style.opacity = 0;
  containerLogin.style.opacity = 0;
  containerSignup.style.opacity = 100;
  InputNameS.value = "";
  InputEmailS.value = "";
  InputPswdS.value = "";
  InputPswdL.value = "";
  InputEmailL.value = "";
});

btnLogin2.addEventListener('click', function (e) {
  e.preventDefault();
  containerApp.style.opacity = 100;
  appContainer.style.opacity = 0;
  containerLogin.style.opacity = 100;
  containerSignup.style.opacity = 0;
});
