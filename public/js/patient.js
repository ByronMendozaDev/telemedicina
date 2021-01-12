//Sign Out Method
const logout = document.querySelector("#logout");

logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        // console.log("User signed out");
        location.href = '../index.html'
    })
})

auth.onAuthStateChanged(user => {
    console.log(user);
    
})
