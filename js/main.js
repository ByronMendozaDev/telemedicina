const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

<<<<<<< HEAD
function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
		setSuccessFor(username);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
=======
sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const signupform = document.getElementById('signup-form');
const signinform = document.getElementById('signin-form');
const signinemail = document.getElementById('signin-email');
const signupemail = document.getElementById('signup-email');
const signinpassword = document.getElementById('signin-password');
const signuppassword = document.getElementById('signup-password');
const signuppassword2 = document.getElementById('signup-password2');

signupform.addEventListener('submit', e => {
  e.preventDefault();
  checkInputs();
});

signinform.addEventListener('submit', e => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const signupemailValue = signupemail.value.trim();
	const signuppasswordValue = signuppassword.value.trim();
	const signuppassword2Value = signuppassword2.value.trim();
	
	if(signupemailValue === '') {
		setErrorFor(signupemail, 'Email cannot be blank');
	} else if (!isEmail(signupemailValue)) {
		setErrorFor(signupemail, 'Not a valid email');
	} else {
		setSuccessFor(signupemail);
	}
	
	if(signuppasswordValue === '') {
		setErrorFor(signuppassword, 'Password cannot be blank');
	} else {
		setSuccessFor(signuppassword);
	}
	
	if(signuppassword2Value === '') {
		setErrorFor(signuppassword2, 'Password2 cannot be blank');
	} else if(signuppasswordValue !== signuppassword2Value) {
		setErrorFor(signuppassword2, 'Passwords does not match');
	} else{
		setSuccessFor(signuppassword2);
>>>>>>> loginRegister
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
<<<<<<< HEAD
	formControl.className = 'form-control error';
=======
	formControl.className = 'input-field error';
>>>>>>> loginRegister
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
<<<<<<< HEAD
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}













// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});
=======
	formControl.className = 'input-field success';
}
	
function isEmail(signupemail) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(signupemail);
}


>>>>>>> loginRegister
