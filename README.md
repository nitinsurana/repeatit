# RepeatIt
> A User Action Simulator Chrome Extension

[![GitHub version](https://badge.fury.io/gh/nitinsurana%2Frepeatit.svg)](https://badge.fury.io/gh/nitinsurana%2Frepeatit) [![Build Status](https://travis-ci.org/nitinsurana/repeatit.svg?branch=master)](https://travis-ci.org/nitinsurana/repeatit)

## ~~Installation ([Video](https://youtu.be/GqB_R2ODFH0))~~

1. ~~Visit extension home page - `https://github.com/nitinsurana/repeatit`~~
2. ~~Click on "Release" Tab.~~
3. ~~Download the latest version ".crx" file.~~
4. ~~Visit "chrome://extensions/" url in Google Chrome.~~
5. ~~Drag the downloaded .crx file to the extension page.~~
6. ~~A popup window will appear saying "Add RepeatIt", click on "Add Extension"~~
7. ~~A message will appear showing the extension has been added successfully.~~



## How to contribute
Visit [Developers/Contributors section in Wiki.](https://github.com/nitinsurana/repeatit/wiki#developerscontributors-)



## Todos

0. Ability to decide which pSets should be visible in the UI
1. Ability to add more pSets for a recipe
2. Ability to make pSet readOnly
3. Add feature to steps to have actions array, instead of a single action on a single selector and add aggregation logic in recording.
5. Create feature "playback speed" for running recipes. Currently, it's 500ms.
6. Test to make sure all Recipes are present in inject.js combined and every recipe contains `steps`
9. Create a options page to import/export all/selective recipes/recordings but these won't be available to all extension installations. (Needs fileSystem permission)
10. Upgrade extension to use Backbone so that recipelist can be a Backbone collection with unique recipe ids and appropriate events to update popup.html DOM.
11. Recorded recipes should wait for DOM manipulation and ajax-requests to complete before triggering the next step.
12. Create a wait-step such that the next action should wait unless that many seconds for the QA/Tester to see the expected result
13. Create a way for extension users to see the pre-requisite & description for every extension and then execute it when pre-requisities match. Best would be to create a page on github wiki 
for every recipe with screenshots and if possible with videos showing how does that particular recipe works.
14. Create a way for recipes to take input for e.g. "Create Assessment with 5 random qTypes" to take what qTypes and assessment-name. 
17. Add ability in the UI to add multiple param-sets for a particular Recipe & then use one at a time. (Login - Instructor, Student, Admin)
18. Add created_by and author_link to original author of Recipe and show them in popup.html
19. In popup.html show recently used recipes at the top with search working in the same order.
23. Create a screencast for every recipe showing how the recipe works and what is the pre-requisite.
24. Add ability to add recipe description in html (add pre-requisities here)
26. Create a child-recipe to modify points and use it internally in FillQuestionRecipe
27. Allow user to create custom recipes by combining recipes with parameters.
31. Add ability for selector to be a function which will be very useful for plugins, for e.g. the element might be present but it's still not initialized to redactor/select2 yet.



## RoadMap

2. Ability to run these recipes from Selenium (Extension install and execute on console - `window.recipe.RecipePlayer(someRecipe)`
6. Recipe options and a way to edit options for every recipe and local saving without affecting any other installation.
7. Write a plugin for firefox
8. Create gulp tasks to create packaged extensions to be installed in chrome & firefox, with versions and add them to releases.
9. Add support for creating safari extension and gulp-task to do the same. 


##Limitations

1. Only websites having jquery can be automated.
2. If the value of any variable defined in paramSet for a recipe contains `'`, the recipe does not work/run/execute. 
