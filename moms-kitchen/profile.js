"use strict";

let potentialIngredientCount = 3;
let ingredientList = [];
// let userRecipeCards = JSON.parse(localStorage.getItem("recipeCards"));
if (localStorage.getItem("hasRecipes") === 'false') {
    localStorage.setItem("numOfUserRecipes", 0);
}

if (localStorage.getItem('loggedIn') === 'true') {
    document.getElementById("welcome-message").textContent = "Welcome back, " + localStorage.getItem('userName') + "!";
    document.getElementById("profile-styles").href = 'profile.css';

    // display the user's recipes
    // if (localStorage.getItem("hasRecipes") === 'true') {
    //     console.log("user has recipes");
    //     for (let i = 1; i <= localStorage.getItem("numOfUserRecipes"); i++) {
    //         // append the user recipe element items
    //         // get the recipe card element from local storage string object
    //         let currRecipeCard = JSON.parse(localStorage.getItem(`userRecipe${i}`));
    //         // document.querySelector("#recipe-card-container").appendChild(currRecipeCard);
    //     }
    // }   
} else {
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


// listen for the user to upload an image and save it to local storage
const uploadImageEl = document.querySelector("#uploadImage");
uploadImageEl.addEventListener("change", function() {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        localStorage.setItem("recipeImage", reader.result);
    });

    reader.readAsDataURL(this.files[0]);
});


function addRecipe() {
    // get the recipe name and make the div for it
    let recipeNameDiv = document.createElement("div");
    recipeNameDiv.setAttribute("class", "recipe-name");
    recipeNameDiv.innerHTML = `<p>${document.querySelector("#recipeName").value}</p>`;
    let recipeNameDivHTML = recipeNameDiv.outerHTML;

    // make an image element and put the uploaded image into it as the src
    let recipeImageEl = document.createElement("img");
    recipeImageEl.setAttribute("class", "recipe-image");
    recipeImageEl.setAttribute("src", localStorage.getItem("recipeImage"));
    let recipeImageElHTML = recipeImageEl.outerHTML;

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
    let newRecipeCard = document.createElement("div");
    newRecipeCard.setAttribute("class", "recipe-card");
    // put it all together
    newRecipeCard.innerHTML = recipeNameDivHTML + recipeImageElHTML + newRecipeIngredientsHTML;

    // put it into the collection of the user's recipes
    document.querySelector("#recipe-card-container").appendChild(newRecipeCard);

    localStorage.setItem("hasRecipes", true);
    
    localStorage.setItem("numOfUserRecipes", parseInt(localStorage.getItem("numOfUserRecipes")) + 1);
    console.log(typeof newRecipeCard);
    localStorage.setItem(`userRecipe${localStorage.getItem("numOfUserRecipes")}`, JSON.stringify(newRecipeCard));
    console.log(localStorage.getItem(`userRecipe${localStorage.getItem("numOfUserRecipes")}`));

    // refresh page
    // window.location.href = "profile.html";
    window.scrollTo(0, 0);
    recipeForm.reset();
    document.getElementById("ingredient-list").innerHTML = "<li><input id='ingredient1' type='text' placeholder='ingredient 1' required /></li><li><input id='ingredient2' type='text' placeholder='ingredient 2' required /></li><li><input id='ingredient3' type='text' placeholder='ingredient 3' required /></li><button id='add-ingredient-btn' onclick='addIngredient()' type='button'>add ingredient</button>"
}