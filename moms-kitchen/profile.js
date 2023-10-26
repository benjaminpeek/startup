"use strict";

let potentialIngredientCount = 3;

if (localStorage.getItem('loggedIn') === 'true') {
    document.getElementById("welcome-message").textContent = "Welcome back, " + localStorage.getItem('userName') + "!";
    document.getElementById("profile-styles").href = 'profile.css';
}
else {
    document.getElementById("welcome-message").textContent = "Please login on the Home page to use these features.";
}

function addIngredient() {
    potentialIngredientCount++;
    let newIngredient = document.createElement('li');
    newIngredient.innerHTML = `<input type='text' class='ingredient' placeholder='ingredient ${potentialIngredientCount}' />`;
    document.getElementById("ingredient-list").insertBefore(newIngredient, document.getElementById("add-ingredient-btn"));
}

function addRecipe() {
    console.log("Recipe added");
}