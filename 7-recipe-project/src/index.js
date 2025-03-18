const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const dataFilePath = path.join(__dirname, "../data/recipe-data.json");

app.use(express.json()); // Middleware to parse JSON body

// Helper function to read recipes from file
function readRecipes() {
    return JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
}

// Helper function to write recipes to file
function writeRecipes(recipes) {
    fs.writeFileSync(dataFilePath, JSON.stringify(recipes, null, 2));
}

// Get all recipes
app.get("/find-recipes", (req, res) => {
    res.json(readRecipes());
});

// Get one recipe by index
app.get("/find-recipe/:index", (req, res) => {
    const recipes = readRecipes();
    const index = parseInt(req.params.index);

    if (index >= 0 && index < recipes.length) {
        res.json(recipes[index]);
    } else {
        res.status(404).json({ message: "Recipe not found" });
    }
});

// Delete a recipe
app.get("/delete-recipe/:index", (req, res) => {
    const recipes = readRecipes();
    const index = parseInt(req.params.index);

    if (index >= 0 && index < recipes.length) {
        const deletedRecipe = recipes.splice(index, 1);
        writeRecipes(recipes);
        res.json({ message: "Recipe deleted", deletedRecipe });
    } else {
        res.status(404).json({ message: "Recipe not found" });
    }
});

// Update recipe name
app.get("/update-recipe/:index/:newName", (req, res) => {
    const recipes = readRecipes();
    const index = parseInt(req.params.index);
    const newName = req.params.newName;

    if (index >= 0 && index < recipes.length) {
        recipes[index].name = newName;
        writeRecipes(recipes);
        res.json({ message: "Recipe updated", updatedRecipe: recipes[index] });
    } else {
        res.status(404).json({ message: "Recipe not found" });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
