const signupform = document.getElementById('signup-form');
const signupemail = document.getElementById('signup-email');
const signuppassword = document.getElementById('signup-password');
const signupfullname = document.getElementById('signup-full_name');
const signupusername = document.getElementById('signup-user_name');

const especialityList = document.querySelector('.especialities');

const setupEspeciality = (data) => {
	const html = '';
	data.forEach(doc => {
		const especiality = doc.data();
		console.log(especiality)
		const option = `
			<option value="${especiality.name}">${especiality.name}</option>
		`;
		html += option
	});

	especialityList.innerHTML = html;

}

db.collection('medicine_esp').get().then(snapshot => {
	setupEspeciality(snapshot.docs)
})

signupform.addEventListener('submit', (e) => {
	e.preventDefault();

	//get user info
	const email = signupemail.value;
	const password = signuppassword.value;
    const fullname = signupfullname.value;
    const username = signupusername.value;

	// sign up the user
	auth.createUserWithEmailAndPassword(email, password).then(cred => {
		// save user on collection to firebase db
		return db.collection('users').doc(cred.user.uid).set({
            email: email,
            fullname: fullname,
            username: username,
            role: 'doctor'

		});

	}).then(() => {
		// location.href = 'views/patient.html' //redirection to patient view
		signupform.reset();
	});
});

const logout = document.querySelector("#logout");

logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        // console.log("User signed out");
        location.href = 'admin-login.html'
    })
})