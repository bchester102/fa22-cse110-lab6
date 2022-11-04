// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  let recipeString = localStorage.getItem('recipes');
  if (recipeString == null) return [];
  let recipes = JSON.parse(recipeString);
  let recipeArray = [];
  for (let index = 0; index < recipes.length; index++) {
    recipeArray.push(recipes[index]);
  }
  return recipeArray;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. - Get a reference to the <main> element
  let mainElement = document.querySelector('main');
  // A11. Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  //console.log(recipes.length);
  recipes.forEach(recipeData => {
    let recipeCard = document.createElement('recipe-card');
    recipeCard.data = recipeData;
    mainElement.append(recipeCard);
  });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. - Get a reference to the <form> element
  let form = document.getElementById('new-recipe');
  
  // B3. - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  // Steps B4-B9 will occur inside the event listener from step B3
  // B4. - Create a new FormData object from the <form> element reference above
    let formData = new FormData(form);
  // B5. - Create an empty object (I'll refer to this object as recipeObject to
  //            make this easier to read), and then extract the keys and corresponding
  //            values from the FormData object and insert them into recipeObject
    let recipeObject = {};
    for (const [key, value] of formData.entries()) {
      recipeObject[key] = value;
    }
    // B6. - Create a new <recipe-card> element
    let recipeCard = document.createElement('recipe-card');
    // B7. - Add the recipeObject data to <recipe-card> using element.data
    recipeCard.data = recipeObject;
    // B8. - Append this new <recipe-card> to <main>
    document.querySelector('main').append(recipeCard);
    // B9. - Get the recipes array from localStorage, add this new recipe to it, and
    //            then save the recipes array back to localStorage
    let recipesArray = getRecipesFromStorage();
    recipesArray.push(recipeObject);
    saveRecipesToStorage(recipesArray);
    
    form.reset();

  });

  // B10. - Get a reference to the "Clear Local Storage" button
  let clearStorageButton = document.querySelector('.danger');
  // B11. - Add a click event listener to clear local storage button
  clearStorageButton.addEventListener('click', () =>{

    // Steps B12 & B13 will occur inside the event listener from step B11
    // B12. - Clear the local storage
    localStorage.clear();
    // B13. - Delete the contents of <main>
    document.querySelector('main').innerHTML = '';
  });

}
