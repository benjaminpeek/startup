
if (localStorage.getItem('loggedIn') === 'true') {
    document.getElementById("welcome-message").textContent = "Welcome back, " + localStorage.getItem('userName') + "!";
    document.getElementById("profile-styles").href = 'profile.css';
}
else {
    document.getElementById("welcome-message").textContent = "Please login on the Home page to use these features.";
}