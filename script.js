//console.clear();

const formLogin = document.getElementById('login');
const signupBtn = document.querySelector('.submit-btn');
const btnlogin = document.getElementById('btnLogin');
const InputNameS = document.getElementById('signupName');
const InputEmailS = document.getElementById('signupEid');
const InputPswdS = document.getElementById('signupPswd');
const InputEmailL = document.getElementById('LoginEid');
const InputPswdL = document.getElementById('LoginPswd');

let dataArr = JSON.parse((localStorage.getItem("Datas"))) ? JSON.parse((localStorage.getItem("Datas"))) : [];
console.log(dataArr);

let dataBase = {
	Name: null,
	Email: null,
	Password: null,
};


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
	//console.log(dataArr);
	//console.log(InputEmailL.value, InputPswdL.value);
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



