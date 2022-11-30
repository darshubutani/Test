let form = document.getElementById("form");
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let pswdInput = document.getElementById("pswdInput");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

let database = [{}];


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
  // data.push({
  //   names: nameInput.value || InputNameS.value,
  //   email: emailInput.value || InputEmailS.value,
  //   password: pswdInput.value || InputPswdS.value,
  // });

  // localStorage.setItem("data", JSON.stringify(data));
  // console.log(data);


  //Read / Fetch data

// fetch('https://crudcrud.com/api/15abf07de1d840a4ab0696ac75a1c342/database')
// .then(response => response.json())
// .then(data => console.log(data))


  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  database.map((x, index) => {
    return (tasks.innerHTML += `
    <div id=${index}>
          <span class="fw-bold">${x.names}</span>
          <span class="small text-secondary">${x.email}</span>
          <p>${x.password}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);

//Add data api

// fetch('https://crudcrud.com/api/15abf07de1d840a4ab0696ac75a1c342/database', {
//   headers: { "Content-Type": "application/json; charset=utf-8" },
//   method: 'POST',
//   body: JSON.stringify({
//     name: 'mno',
//     Email: 'mno@123',
//       password:123,
//   })
// })
// .then(response => response.json())
// .then(data => console.log(data))


  });

  resetForm();
};

let deleteTask = (e) => {
  confirm('Are you sure to delete this record ?')
  //e.parentElement.parentElement.remove();
  database.splice(e.parentElement.parentElement.id, 1);
  // localStorage.setItem("data", JSON.stringify(data));
  // console.log(database);

//delete opration
//fetch(
  // 'https://crudcrud.com/api/15abf07de1d840a4ab0696ac75a1c342/database/638749f1aaf0eb03e8f91b83', {
  //   method: 'DELETE'
  // })
  // .then(response => console.log(response))



};

let editTask = (e) => {

  // let selectedTask = e.parentElement.parentElement;
  // nameInput.value = selectedTask.children[0].innerHTML;
  // emailInput.value = selectedTask.children[1].innerHTML;
  // pswdInput.value = selectedTask.children[2].innerHTML;
  // window.confirm = function () { return false; };


  //Update database using unique id  
  // fetch(
  //   'https://crudcrud.com/api/15abf07de1d840a4ab0696ac75a1c342/database/638749f1aaf0eb03e8f91b83', {
  //     headers: { "Content-Type": "application/json; charset=utf-8" },
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       name: 'updated',
  //       Email: 'mno@123',
  //       password:123,
       
  //     })
  //   })
  //   .then(response => console.log(response))

  deleteTask(e);
};

let resetForm = () => {
  nameInput.value = "";
  emailInput.value = "";
  pswdInput.value = "";
 
};
//IIFE to display data 
(() => {
  // data = JSON.parse(localStorage.getItem("data")) || []
  // console.log(data);
   

  createTasks();
})();
