const loginForm = document.getElementById("login-form");

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
    console.log(name.value);
    localStorage.setItem("userName", name.value);
    window.location.href = "profile.html";
    localStorage.setItem("loggedIn", true);
}
