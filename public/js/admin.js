const logout = document.querySelector("#logout");

logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        // console.log("User signed out");
        location.href = 'admin-login.html'
    })
})

auth.onAuthStateChanged(user => {
    console.log(user);
    
})

// get data to collection
db.collection('users').get().then(snapshot => {
    setupUser(snapshot.docs)
})

const setupUser = (data) => {
    data.forEach(doc => {
        const userInfor = doc.data();
        console.log(userInfor);
    })

}


