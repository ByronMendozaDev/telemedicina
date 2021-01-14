const signinform = document.getElementById('signin-form');
const signinemail = document.getElementById('signup-email');
const signinpassword = document.getElementById('signin-password');

signinform.addEventListener('submit', e => {
	e.preventDefault();

	// login user
	const loginemail = signinemail.value;
	const loginpassword = signinpassword.value;
	auth.signInWithEmailAndPassword(loginemail,loginpassword).then(cred => {
		console.log(cred.user)
	}).then(() => {
		location.href = '../views/doctor.html' //redirection to patient view
	});
});
