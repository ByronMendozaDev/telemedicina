const logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
    // console.log("User signed out");
    location.href = "admin-login.html";
    });
});
