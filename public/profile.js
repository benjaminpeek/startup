"use strict";

let potentialIngredientCount = 3;
let ingredientList = [];
// let clearRecipesPressed = false;
// if (localStorage.getItem("hasRecipes") === 'false' || localStorage.getItem("numOfUserRecipes") === null) {
//     localStorage.setItem("numOfUserRecipes", 0);
// }

displayRecipes();

async function displayRecipes() {
    if (localStorage.getItem("clearRecipesPressed") === 'true') {
        document.querySelector("#recipe-card-container").innerHTML = "";
    }

    if (localStorage.getItem('loggedIn') === 'true') {
        document.getElementById("welcome-message").textContent = "Welcome back, " + localStorage.getItem('userFirstName') + "!";
        document.getElementById("profile-styles").href = 'profile.css';
    
        // display the user's recipes
        let recipes = await fetch(`/api/user_recipes/${localStorage.getItem("userEmail")}`);
        recipes = await recipes.json();
        if (recipes !== null) {
            console.log("recipes are in storage");
            for (let recipe of recipes) {
                // console.log(recipe);
                let currRecipeDiv = document.createElement("div");
                currRecipeDiv.setAttribute("class", "recipe-card");
                currRecipeDiv.innerHTML = recipe.recipeName + recipe.recipeImage + recipe.recipeIngredients;

                document.querySelector("#recipe-card-container").appendChild(currRecipeDiv);
            }
        }   
    } else {
        document.getElementById("welcome-message").textContent = "Please login on the Home page to use these features.";
    }
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


// listen for the user to upload an image and save it to local storage
const uploadImageEl = document.querySelector("#uploadImage");
uploadImageEl.addEventListener("change", function() {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        localStorage.setItem("recipeImage", reader.result);
    });

    reader.readAsDataURL(this.files[0]);
});


async function addRecipe() {
    // get the recipe name and make the div for it
    let recipeNameDiv = document.createElement("div");
    recipeNameDiv.setAttribute("class", "recipe-name");
    recipeNameDiv.innerHTML = `<p>${document.querySelector("#recipeName").value}</p>`;
    let recipeNameDivHTML = recipeNameDiv.outerHTML;

    // make an image element and put the uploaded image into it as the src
    let recipeImageEl = document.createElement("img");
    recipeImageEl.setAttribute("class", "recipe-image");
    recipeImageEl.setAttribute("src", localStorage.getItem("recipeImage"));
    let recipeImageHTML = recipeImageEl.outerHTML;

    // save all of the ingredients into a list
    for (let i = 1; i <= potentialIngredientCount; i++) {
        const currIngredient = document.querySelector(`#ingredient${i}`).value;
        if (currIngredient.length > 0) {
            ingredientList.push(currIngredient);
        }
    } 

    // make the new recipe ingredient list element for HTML
    let newRecipeIngredients = document.createElement("ul");
    newRecipeIngredients.setAttribute("class", "recipe-ingredients");
    for(let i = 0; i < ingredientList.length; i++) {
        newRecipeIngredients.innerHTML += `<li>${ingredientList[i]}</li>`;
    }
    let newRecipeIngredientsHTML = newRecipeIngredients.outerHTML;
    
    // make a new recipe card
    let newRecipeCard_Div = document.createElement("div");
    newRecipeCard_Div.setAttribute("class", "recipe-card");
    // put it all together
    newRecipeCard_Div.innerHTML = recipeNameDivHTML + recipeImageHTML + newRecipeIngredientsHTML;

    let newRecipeCard = {
        recipeName: recipeNameDivHTML,
        recipeImage: recipeImageHTML,
        recipeIngredients: newRecipeIngredientsHTML,
        userEmail: localStorage.getItem("userEmail")
    }

    try {
        const response = await fetch('/api/recipe', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newRecipeCard),
          });
    } catch (error) {
        console.log(error.message);
        console.log("respond failure");
        // If there was an error then just put the recipe up locally, will not be saved across sessions
        document.querySelector("#recipe-card-container").appendChild(newRecipeCard_Div);
    }   

    localStorage.setItem("hasRecipes", true);

    // refresh page
    window.scrollTo(0, 0);
    recipeForm.reset();
    ingredientList = [];
    document.getElementById("ingredient-list").innerHTML = "<li><input id='ingredient1' type='text' placeholder='ingredient 1' required /></li><li><input id='ingredient2' type='text' placeholder='ingredient 2' /></li><li><input id='ingredient3' type='text' placeholder='ingredient 3' /></li><button id='add-ingredient-btn' onclick='addIngredient()' type='button'>add ingredient</button>";
    localStorage.removeItem("recipeImage");
    displayRecipes();
    window.location.href = "profile.html";
}

// function clearRecipes() {
//     document.querySelector("#recipe-card-container").innerHTML = "";
//     for (let i = 1; i <= localStorage.getItem("numOfUserRecipes"); i++) {
//         localStorage.removeItem(`userRecipe${i}HTML`);
//     }
//     localStorage.setItem("numOfUserRecipes", 0);
//     localStorage.setItem("hasRecipes", false);
//     localStorage.setItem("clearRecipesPressed", true);
// }