const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
	container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
	container.classList.remove("sign-up-mode");
});
//data to pwd validation
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");


const signupform = document.getElementById('signup-form');
const signinform = document.getElementById('signin-form');
const signinemail = document.getElementById('signin-email');
const signupemail = document.getElementById('signup-email');
const signinpassword = document.getElementById('signin-password');
const signuppassword = document.getElementById('signup-password');
const signuppassword2 = document.getElementById('signup-password2');
const signupusername = document.getElementById('signup-user-name');
const signupfullname = document.getElementById('signup-full-name')


const registrar = (data, e) => {

    const { email, password, displayName, fullname, role} = data;

    auth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
            const uid = result.user.uid;
            result.user.updateProfile({
                displayName: displayName,
            });
            db.collection("users").doc().set({
                uid,
                email,
                fullname,
                role,
                username: displayName,
            });
            console.log(e);
        })
        .catch(function (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("El correo ya existe.");
            } else if (error.code === "auth/weak-password") {
                alert("Ingrese contraseña");
            } else {
                console.log(error);
            }
        });
};

//signup
signupform.addEventListener('submit', e => {
	e.preventDefault();
	checkInputs();

	//get user info 
	const email = signupemail.value;
	const password = signuppassword.value;
	const password2 = signuppassword2.value;
	const displayName = signupusername.value;
	const fullname = signupfullname.value;
	const role = 'patient';
	const data = {
		email,
		password,
		displayName,
		fullname,
		role
	};

	console.log(email, password, password2);

	// sign up the user
	// auth.createUserWithEmailAndPassword(email, password).then(cred => {
	// 	// save user on collection to firebase db
	// 	return db.collection('users').doc(cred.user.uid).set({
	// 		email: email,
	// 		role: 'patient'
	// 	});
				
	registrar(data, e);
	signupform.reset();
});

signinform.addEventListener('submit', e => {
	e.preventDefault();
	checkInputs();

	// login user
	const loginemail = signinemail.value;
	const loginpassword = signinpassword.value;
	auth.signInWithEmailAndPassword(loginemail,loginpassword).then(cred => {
		console.log(cred.user)
	}).then(() => {
		location.href = 'views/patient.html' //redirection to patient view
	});
});

function checkInputs() {
	
	// trim to remove the whitespaces
	const signingemailValue = signinemail.value.trim();
	const signinpasswordValue = signinpassword.value.trim();
	const signupemailValue = signupemail.value.trim();
	const signuppasswordValue = signuppassword.value.trim();
	const signuppassword2Value = signuppassword2.value.trim();

	if (signupemailValue === '') {
		setErrorFor(signupemail, 'Email cannot be blank');
	} else if (!isEmail(signupemailValue)) {
		setErrorFor(signupemail, 'Not a valid email');
	} else {
		setSuccessFor(signupemail);
	}

	if (signingemailValue === '') {
		setErrorFor(signinemail, 'Email cannot be blank');
	}

	if (signuppasswordValue === '') {
		setErrorFor(signuppassword, 'Password cannot be blank');
	} else if (!signuppassword.value.match(lowerCaseLetters)) {
		setErrorFor(signuppassword, 'Check password rules');
	}else if(!signuppassword.value.match(upperCaseLetters)){
		setErrorFor(signuppassword, 'Check password rules');
	}else if(!signuppassword.value.match(numbers)){
		setErrorFor(signuppassword, 'Check password rules');
	} else if(signuppassword.value.length < 8){
		setErrorFor(signuppassword, 'Check password rules');
	}
	else {		
		setSuccessFor(signuppassword);
	}

	if (signinpasswordValue === '') {
		setErrorFor(signinpassword, 'Password cannot be blank');
	}

	if (signuppassword2Value === '') {
		setErrorFor(signuppassword2, 'Password2 cannot be blank');
	} else if (signuppasswordValue !== signuppassword2Value) {
		setErrorFor(signuppassword2, 'Passwords does not match');
	} else {
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

// When the user clicks on the password field, show the message box
signuppassword.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
signuppassword.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
signuppassword.onkeyup = function() {
  // Validate lowercase letters
  
  if(signuppassword.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}


  if(signuppassword.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  if(signuppassword.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if(signuppassword.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}
