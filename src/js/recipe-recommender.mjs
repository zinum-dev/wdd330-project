
//const SPOONACULAR_API_KEY = "ac71f833e3914b4e8c03ee6c209ccb64"; 
const SPOONACULAR_API_KEY = "aa4e1f66790e47f69ee4f7e61e916a2f";

// Nutritional guidelines based on temperature (in Celsius)
const nutritionalGuidelines = {
    cold: {
        minCalories: 500,
        maxCalories: 1200,
        minFat: 20,
    },
    mild: {
        minCalories: 300,
        maxCalories: 800,
    },
    hot: {
        minCalories: 150,
        maxCalories: 600,
        maxFat: 20,
    }
};


async function getRecipesFromSpoonacular(params) {
    const baseUrl = "https://api.spoonacular.com/recipes/complexSearch";
    const query = {
        apiKey: SPOONACULAR_API_KEY,
        addRecipeInformation: true,
        instructionsRequired: true,
        number: 9, // Get 9 recipes to rotate
        ...params
    };

    // Build the URL with all query parameters
    const urlParams = new URLSearchParams();
    for (const key in query) {
        if (query[key] !== undefined) {
            urlParams.append(key, query[key]);
        }
    }
    const url = `${baseUrl}?${urlParams.toString()}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching recipes from Spoonacular:", error);
        return [];
    }
}

export async function getRecipesCurrentTemp(temperature) {
    let guidelines;
    if (temperature < 10) {
        guidelines = nutritionalGuidelines.cold;
    } else if (temperature >= 10 && temperature < 20) {
        guidelines = nutritionalGuidelines.mild;
    } else {
        guidelines = nutritionalGuidelines.hot;
    }

    const params = {
        query: guidelines.query,
        minCalories: guidelines.minCalories,
        maxCalories: guidelines.maxCalories,
        minFat: guidelines.minFat,
        maxFat: guidelines.maxFat
    };

    const recipes = await getRecipesFromSpoonacular(params);
    if (!recipes || recipes.length === 0) return [];
    // Shuffle recipes and pick up to 3 randomly
    const shuffled = recipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(recipe => ({
        id: recipe.id,
        name: recipe.title,
        description: `Ready in ${recipe.readyInMinutes} minutes. Servings: ${recipe.servings}.`,
        imageUrl: recipe.image,
        sourceUrl: recipe.sourceUrl,
    }));
}

export async function getRecipesDailyRange(minTemp, maxTemp) {
    let guidelines;
    // Simplified logic for daily range, can be expanded
    if (maxTemp < 15) { // Generally cold day
        guidelines = nutritionalGuidelines.cold;
    } else if (minTemp >= 20) { // Generally hot day
        guidelines = nutritionalGuidelines.hot;
    } else { // Mild or significant swing
        guidelines = nutritionalGuidelines.mild;
    }

    const params = {
        query: guidelines.query,
        minCalories: guidelines.minCalories,
        maxCalories: guidelines.maxCalories,
        minFat: guidelines.minFat,
        maxFat: guidelines.maxFat,
        number: 5 // Get only 5 recipe for daily range to rotate
    };

    const recipes = await getRecipesFromSpoonacular(params);
    if (!recipes || recipes.length === 0) return null;
    // Return a random recipe from the found ones (up to 3)
    const idx = Math.floor(Math.random() * recipes.length);
    const recipe = recipes[idx];
    return {
        id: recipe.id,
        name: recipe.title,
        description: `Ready in ${recipe.readyInMinutes} minutes. Servings: ${recipe.servings}.`,
        imageUrl: recipe.image,
        sourceUrl: recipe.sourceUrl,
    };
}

