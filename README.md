# RepeatIt
> A User Action Simulator Chrome Extension



## Installation

1. Clone this repo
2. Visit `chrome://extensions` in Chrome
3. Select `Developer Mode`
4. Click on `Load unpacked extension`
5. Select the directory in which this repo is cloned



## Steps to create a new Recipe

1. Create a new Recipe.js file (for e.g. MyNewRecipe.js)
2. Create a new entry in the array defined in recipes.json. 
3. Before committing run the gulp task `scripts` so that your recipe is minified and added to the extension (inject.js)

>NOTE - Make sure the `id` of the new entry matches with the global namespace of the recipe. For e.g. window.recipe.myNewRecipe should always have `id = myNewRecipe`



## Todos

1. Make the search box functional so that recipes can be searched by their title in real-time i.e. search as you type (after initial loading)
2. Load recipes.json only once for the entire browser session
3. Placeholder for search input
