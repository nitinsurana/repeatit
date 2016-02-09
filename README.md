# RepeatIt
> A User Action Simulator Chrome Extension

## Steps to create a new Recipe

1. Create a new Recipe.js file (for e.g. MyNewRecipe.js)
2. Create a new entry in the array defined in recipes.json. 
NOTE - Make sure the `id` of the new entry matches with the global namespace of the recipe. For e.g. window.recipe.myNewRecipe should always have `id = myNewRecipe`
3. Before committing run the gulp task `scripts` so that your recipe is minified and added to the extension (inject.js)
