const logout = document.querySelector("#logout");

logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("User signed out")
    }).then(() => {
        location.href = '../index.html'
    })
})

//get data to user-profile
// const userId = auth.currentUser.uid;
// //Get the user data
// return .ref('users' + userId).once('value').then(function(snapshot) {
//     // var username = (snapshot.val() && snapshot.val().username) || 'Patient';
//     var email = (snapshot.val() && snapshot.val().email);
//     console.log(email);
// });

// logout user

// const logoutbtn = document.getElementById("#logout");
// logoutbtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     auth.signOut().then(() => {
//         console.log("User signed out")
//     });
// })