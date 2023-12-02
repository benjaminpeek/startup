
async function displayRecipes() {
  await fetch(`/api/recipes`)
    .then((response) => response.json())
    .then((data) => {
      let recipe1 = data.recipes[0]
      let recipe2 = data.recipes[1]
      let recipe3 = data.recipes[2]
      let recipe4 = data.recipes[3]

      const recipeCard1El = document.getElementById("recipe-card-1");
      let recipeCard1IngredientsHTML = "";
      for (const ingredient of recipe1.extendedIngredients) {
        recipeCard1IngredientsHTML += `<li>${ingredient.name}</li>`;
      }
      recipeCard1El.innerHTML = `<div class="recipe-name"><p>${recipe1.title}</p></div><img src="${recipe1.image}" class="recipe-image" /> <ul class="recipe-ingredients">${recipeCard1IngredientsHTML}</ul>`;
  
      const recipeCard2El = document.getElementById("recipe-card-2");
      let recipeCard2IngredientsHTML = "";
      for (const ingredient of recipe2.extendedIngredients) {
        recipeCard2IngredientsHTML += `<li>${ingredient.name}</li>`;
      }
      recipeCard2El.innerHTML = `<div class="recipe-name"><p>${recipe2.title}</p></div><img src="${recipe2.image}" class="recipe-image" /> <ul class="recipe-ingredients">${recipeCard2IngredientsHTML}</ul>`;
        
      const recipeCard3El = document.getElementById("recipe-card-3");
      let recipeCard3IngredientsHTML = "";
      for (const ingredient of recipe3.extendedIngredients) {
        recipeCard3IngredientsHTML += `<li>${ingredient.name}</li>`;
      }
      recipeCard3El.innerHTML = `<div class="recipe-name"><p>${recipe3.title}</p></div><img src="${recipe3.image}" class="recipe-image" /> <ul class="recipe-ingredients">${recipeCard3IngredientsHTML}</ul>`;

      const recipeCard4El = document.getElementById("recipe-card-4");
      let recipeCard4IngredientsHTML = "";
      for (const ingredient of recipe4.extendedIngredients) {
        recipeCard4IngredientsHTML += `<li>${ingredient.name}</li>`;
      }
      recipeCard4El.innerHTML = `<div class="recipe-name"><p>${recipe4.title}</p></div><img src="${recipe4.image}" class="recipe-image" /> <ul class="recipe-ingredients">${recipeCard4IngredientsHTML}</ul>`;
    });
  }
  
displayRecipes();
  