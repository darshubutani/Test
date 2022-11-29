//Table code

//console.clear();


const formLogin = document.getElementById('login');
const signupBtn = document.querySelector('.submit-btn');
const btnlogin = document.getElementById('btnLogin');
const InputNameS = document.getElementById('signupName');
const InputEmailS = document.getElementById('signupEid');
const InputPswdS = document.getElementById('signupPswd');
const InputEmailL = document.getElementById('LoginEid');
const InputPswdL = document.getElementById('LoginPswd');
const containerApp = document.querySelector('.form-structor');
const containApp = document.getElementById('container');
 const contApp = document.querySelector('.form-structor .signup');
 const cApp = document.querySelector('.form-structor .signup.slide-up');
 containApp.style.opacity = 0;


let dataArr = JSON.parse((localStorage.getItem("Datas"))) ? JSON.parse((localStorage.getItem("Datas"))) : [];
console.log(dataArr);

let dataBase = {
	Name: null,
	Email: null,
	Password: null,
};

//Table data

CreateTable("mytable", "container", ["Name", "Email", "Password"]);
for (let j = 0; j < dataArr.length; j++) {
	TableAdd([dataArr[j].Name, dataArr[j].Email, dataArr[j].Password]);
}

function CreateTable(id, where, data) {
	let table = "<table id='" + id + "'><thead><tr>";
	for (let i = 0; i < data.length; i++) {
		table = table + "<th>" + data[i] + "</th>";
	}
	table = table + "<td>" + `<a onClick="tableAddto(this)">Add</a>` + "</td>" + "</tr></thead><tbody></tbody></table>";
	document.getElementById(where).innerHTML += table;
}

function tableAddto() {
	console.log("HEllo");
	containerApp.style.opacity =100;
}

function TableAdd(data) {
	let raw = "<tr>";
	for (let i = 0; i < data.length; i++) {
		raw = raw + "<td>" + data[i] + "</td>";
	}
	raw = raw + "<td>" + `<a onClick="onEdit(this)">Edit</a>
   <a onClick="onDelete(this)">Delete</a>`+ "</td>" + "</tr>";
	document.getElementsByTagName("tbody")[0].innerHTML += raw;	
}

function onEdit(td) {
	selectedRow = td.parentElement.parentElement;
	dataBase.Name = InputNameS.value;
	dataBase.Email = InputEmailS.value;
	dataBase.Password = InputPswdS.value;
	// document.getElementById("Email").value = selectedRow.cells[1].innerHTML;
	// document.getElementById("Password").value = selectedRow.cells[1].innerHTML;
}

function onDelete(td) {
	if (confirm('Are you sure to delete this record ?')) {
		row = td.parentElement.parentElement;
		let id = td;
		let arr = JSON.parse(localStorage.getItem("Datas"));
		console.log(arr);
		document.getElementById("mytable").deleteRow(row.rowIndex);
		dataArr.splice(id,1);
		localStorage.setItem("Datas",JSON.stringify(dataArr));
		console.log(dataArr);
	}
}

signupBtn.addEventListener('click', (e) => {
	e.preventDefault();

	console.log("Hello signup");
	dataBase.Name = InputNameS.value;
	dataBase.Email = InputEmailS.value;
	dataBase.Password = InputPswdS.value;
	console.log(dataBase);

	dataArr.push(dataBase);

	console.log(InputNameS.value, InputEmailS.value, InputPswdS.value);

	//console.log(dataBase);

	localStorage.setItem("Datas", JSON.stringify(dataArr));

	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if (element !== "slide-up") {
			parent.classList.add('slide-up')
		} else {
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

let currentAccount;

btnlogin.addEventListener('click', function (e) {
	e.preventDefault();

	currentAccount = dataArr.find(acc => acc.Email === InputEmailL.value);

	if ((currentAccount.Password) === (InputPswdL.value)) {
		console.log('LogIN');
	};
	console.log("Inside login");
	containerApp.style.opacity = 0;
	containApp.style.opacity = 100;
	console.log(dataArr);


});

formLogin.addEventListener('click', (e) => {
	e.preventDefault();

	console.log("Hello login page");

	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if (element !== "slide-up") {
			parent.classList.add('slide-up')
		} else {
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});




