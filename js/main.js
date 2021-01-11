const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

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
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'input-field error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'input-field success';
}
	
function isEmail(signupemail) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(signupemail);
}


