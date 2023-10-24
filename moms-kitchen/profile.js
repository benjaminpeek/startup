console.log(sessionStorage.getItem('loggedIn'));
if (sessionStorage.getItem('loggedIn') === 'true') {
    document.getElementById("welcome-message").textContent = "Welcome back, " + localStorage.getItem('userName') + "!";
}