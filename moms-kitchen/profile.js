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
    newIngredient.innerHTML = `<input id='ingredient${potentialIngredientCount}' type='text' placeholder='ingredient ${potentialIngredientCount}' />`;
    document.getElementById("ingredient-list").insertBefore(newIngredient, document.getElementById("add-ingredient-btn"));
}

const recipeForm = document.getElementById("addRecipeForm");
recipeForm.addEventListener("submit", e => {
    if (recipeForm.checkValidity()) {
        e.preventDefault();
        addRecipe();
    }
        
    else {
        recipeForm.reportValidity();
    }
});

function addRecipe() {
    const recipeName = document.getElementById("recipeName").value;
    for (let i = 1; i <= potentialIngredientCount; i++) {
        let currIngredient = document.getElementById(`ingredient'${i}`);
        localStorage.setItem(`ingredient${i}`, currIngredient.value);
        console.log(localStorage.getItem(`ingredient${i}`));
    }    

    console.log("Recipe added");
    window.scrollTo(0, 0);
    
    recipeForm.reset();
    // and set recipe list back to original, 3 empty fields
    document.getElementById("ingredient-list").innerHTML = "<li><input type='text' class='ingredient' placeholder='ingredient 1' required /></li> <li><input type='text' class='ingredient' placeholder='ingredient 2' /></li> <li><input type='text' class='ingredient' placeholder='ingredient 3' /></li>";
    potentialIngredientCount = 3;
}