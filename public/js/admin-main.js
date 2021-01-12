const signinform = document.getElementById('signin-form');
const signinemail = document.getElementById('signin-email');
const signinpassword = document.getElementById('signin-password');

signinform.addEventListener('submit', e => {
	e.preventDefault();

	// login user
	const loginemail = 'admin@telemedicina.net';
	const loginpassword = signinpassword.value;
	auth.signInWithEmailAndPassword(loginemail,loginpassword).then(cred => {
		console.log(cred.user)
	}).then(() => {
		location.href = '../views/admin.html' //redirection to patient view
	});
});
