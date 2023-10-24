const loginForm = document.getElementById("login-form");
sessionStorage.setItem("loggedIn", false);

loginForm.addEventListener("submit", e => {
    if (loginForm.checkValidity()) {
        e.preventDefault();
        login();
    }
        
    else {
        loginForm.reportValidity();
    }
});


function login() {
    const name = document.querySelector("#userFirstName");
    localStorage.setItem("userName", name.value);
    window.location.href = "profile.html";
    sessionStorage.setItem("loggedIn", true);
}