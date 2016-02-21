# Repeat It
> A User Action Simulator Chrome Extension



## Installation ([Video](https://youtu.be/GqB_R2ODFH0))

1. Visit extension home page - "https://github.com/nitinsurana/repeatit"
2. Click on "Release" Tab.
3. Download the latest version ".crx" file.
4. Visit "chrome://extensions/" url in Google Chrome.
5. Drag the downloaded .crx file to the extension page.
6. A popup window will appear saying "Add RepeatIt", click on "Add Extension"
7. A message will appear showing the extension has been added successfully.



## [Steps to create a new Recipe](https://github.com/nitinsurana/repeatit/wiki/How-to-create-a-new-Recipe)



## Todos

1. ~~[Make the search box functional so that recipes can be searched by their title in real-time i.e. search as you type (after initial loading)](https://github.com/nitinsurana/repeatit/commit/9a7b0d28942e91253162f63c3de009a6f214805a)~~
2. ~~[Load recipes.json only once for the entire browser session](https://github.com/nitinsurana/repeatit/commit/b01439e8a5a1d9c6d1ce65b307c636f13cc62eef)~~
3. ~~[Placeholder for search input](https://github.com/nitinsurana/repeatit/commit/5dd629e6c44f17ab34aef6d65ba6d4a7e345c68d)~~
4. ~~[Create Child-Recipes which has no existence alone but can always be clubbed with actual Recipes](https://github.com/nitinsurana/repeatit/commit/5dd629e6c44f17ab34aef6d65ba6d4a7e345c68d)~~
5. ~~[Organization of all Recipes and Child-Recipes in directories and corresponding gulp task changes](https://github.com/nitinsurana/repeatit/commit/e98ec17b5a62e445be2d6cb8c1573703d98b153c)~~
6. Test to make sure all Recipes are present in inject.js combined and every recipe contains `steps`
7. [Create a video showing installation](https://www.youtube.com/watch?v=cnG9MnIIfjw) and usage.
8. When recording show some kind of highlighting in the extension icon and Record button.
9. Create a options page to import/export all/selective recipes/recordings but these won't be available to all extension installations. (Needs fileSystem permission)
10. Upgrade extension to use Backbone so that recipelist can be a Backbone collection with unique recipe ids and appropriate events to update popup.html DOM.
11. Recorded recipes should wait for DOM manipulation and ajax-requests to complete before triggering the next step.
12. Create a wait-step such that the next action should wait unless that many seconds for the QA/Tester to see the expected result
13. Create a way for extension users to see the pre-requisite & description for every extension and then execute it when pre-requisities match. Best would be to create a page on github wiki 
for every recipe with screenshots and if possible with videos showing how does that particular recipe works.
14. Create a way for recipes to take input for e.g. "Create Assessment with 5 random qTypes" to take what qTypes and assessment-name. 
15. Create a way for recipes to define pre-requisities and if not matched then show an error-dialog/alert to the user.
16. ~~[Add more steps type (redactor, input, recipe), currently it supports only click](https://github.com/nitinsurana/repeatit/commit/5dd629e6c44f17ab34aef6d65ba6d4a7e345c68d)~~
17. Add ability in the UI to add multiple param-sets for a particular Recipe & then use one at a time. (Login - Instructor, Student, Admin)
18. Add created_by and author_link to original author of Recipe and show them in popup.html
19. In popup.html show recently used recipes at the top with search working in the same order.
20. Add .jshintrc and a gulp task to run jshint over all .js files
21. Add File-A-Bug feature in extension popup
22. Create a markdown file explaining types of recipes, procedure to create recipe, params, start & stop callbacks.
23. Create a screencast for every recipe showing how the recipe works and what is the pre-requisite.
24. Add ability to add recipe description in html (add pre-requisities here)
25. ~~[Start adding extension .crx to releases so that people can download (don't forget to change the version number with every release)](https://github.com/nitinsurana/repeatit/commit/06b4f2aedb9f938b4355dc76d99966cd22cc79df)~~
26. Create a child-recipe to save solution/hint & modify points and use it internally in FillQuestionRecipe
27. Allow user to create custom recipes by combining recipes with parameters.
28. Change params variable in recipes.json to parameterSets and fix all impacts.
29. ~~[Create a gulp profile/task to change contentscript.js & background.js loading json & inject.js urls to internal chrome extension urls during development](https://github.com/nitinsurana/repeatit/commit/06b4f2aedb9f938b4355dc76d99966cd22cc79df)~~
30. ~~[Exclude inject.js from committing and create a task to pack the chrome extension.](https://github.com/nitinsurana/repeatit/commit/06b4f2aedb9f938b4355dc76d99966cd22cc79df)~~
31. Add ability for selector to be a function which will be very useful for plugins, for e.g. the element might be present but it's still not initialized to redactor/select2 yet.



## RoadMap

1. Ability to record actions and create a recipe at run-time
2. Ability to run these recipes from Selenium (Extension install and execute on console - `window.recipe.RecipePlayer(someRecipe)`
3. Put this extension in Chrome Store
4. Implement usageCount of every recipe globally (across all installations, probably use a heroku free nodejs-mongo webapp or free mongo with REST API)
5. Implement normalCompletionTime for every recipes' manual execution and record actual execution average across all installations to show how much did we saved.
6. Recipe options and a way to edit options for every recipe and local saving without affecting any other installation.
7. Write a plugin for firefox
8. Create gulp tasks to create packaged extensions to be installed in chrome & firefox, with versions and add them to releases.
9. Add support for creating safari extension and gulp-task to do the same. 


##Limitations

1. Only websites having jquery can be automated.
2. If the value of any variable defined in paramSet for a recipe contains `'`, the recipe does not work/run/execute. 
