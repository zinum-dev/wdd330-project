import { commomHeaderFooter, getParam } from "./utils.mjs";
//const SPOONACULAR_API_KEY = "ac71f833e3914b4e8c03ee6c209ccb64";
const SPOONACULAR_API_KEY = "aa4e1f66790e47f69ee4f7e61e916a2f";

commomHeaderFooter();

async function getRecipeDetail(recipe_id) {
    console.log(recipe_id)
    const url = `https://api.spoonacular.com/recipes/${recipe_id}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching recipes from Spoonacular:", error);
        return null;
    }
}


async function displayRecipeDetail() {
    const recipe_id = getParam("recipe_id");
    if (!recipe_id) {
        console.error("Recipe ID not found in URL.");
        return;
    }

    const recipe = await getRecipeDetail(recipe_id);

    if (recipe) {
        document.getElementById("recipe-title").textContent = recipe.title;
        document.getElementById("recipe-image").src = recipe.image;
        document.getElementById("recipe-ready-in-minutes").textContent = `${recipe.readyInMinutes} Minutes`;
        document.getElementById("recipe-servings").textContent = `${recipe.servings} Servings`;

        // Display Ingredients
        const ingredientsList = document.getElementById("ingredients-list").querySelector("ul");
        ingredientsList.innerHTML = ""; // Clear existing placeholders
        recipe.extendedIngredients.forEach(ingredient => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<img src="../images/check_box.png" alt="" width="24" heigth="24">
                                  <span>${ingredient.original}</span>`;
            ingredientsList.appendChild(listItem);
        });

        // Display Nutrition
        const nutritionList = document.getElementById("nutrition-list").querySelector("ul");
        nutritionList.innerHTML = ""; // Clear existing placeholders
        if (recipe.nutrition && recipe.nutrition.nutrients) {
            recipe.nutrition.nutrients.slice(0, 6).forEach(nutrient => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<img src="../images/nutrition.png" alt="" width="24" heigth="24">
                                      <span>${nutrient.name}: ${nutrient.amount}${nutrient.unit}</span>`;
                nutritionList.appendChild(listItem);
            });
        }

        // Display Instructions
        const instructionsDiv = document.getElementById("steps");
        instructionsDiv.innerHTML = ""; // Clear existing placeholders
        if (recipe.instructions) {
            // Spoonacular's 'instructions' field can be HTML or plain text
            // If it's HTML, we can directly set innerHTML, but it's safer to parse
            // For simplicity, assuming it's plain text or basic HTML for now.
            // A more robust solution would involve parsing the HTML steps.
            const steps = recipe.instructions.split(/\n|\.\s/);
            steps.forEach((step, index) => {
                if (step.trim() !== "") {
                    const stepDiv = document.createElement("div");
                    stepDiv.classList.add("step");
                    stepDiv.innerHTML = `<h3>Step ${index + 1}</h3><span>${step.trim()}</span>`;
                    instructionsDiv.appendChild(stepDiv);
                }
            });
        } else if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
            recipe.analyzedInstructions[0].steps.forEach((step, index) => {
                const stepDiv = document.createElement("div");
                stepDiv.classList.add("step");
                stepDiv.innerHTML = `<h3>Step ${index + 1}</h3><span>${step.step}</span>`;
                instructionsDiv.appendChild(stepDiv);
            });
        }

    } else {
        document.getElementById("recipe-title").textContent = "Recipe Not Found";
        document.getElementById("recipe-image").src = "";
        document.getElementById("time-difficulty").innerHTML = "";
        document.getElementById("ingredients").innerHTML = "";
        document.getElementById("nutrition").innerHTML = "";
        document.getElementById("instructions").innerHTML = "";
    }
}

document.addEventListener("DOMContentLoaded", displayRecipeDetail);

