(function () {
    var recipesJsonUrl = 'https://rawgit.com/nitinsurana/repeatit/master/src/recipes.json';
    //@ifdef DEBUG
    recipesJsonUrl = chrome.extension.getURL('recipes.json');
    //@endif
    $.ajax({
        url: recipesJsonUrl,
        dataType: 'json'
    }).done(function (response) {
        chrome.storage.sync.set({'recipelist': response}, function () {
            console.log("Saved recipelist in Chrome Storage");
        });
        _.each(response, function (recipe) {
            if (recipe.params) {
                var storageKey = 'params-' + recipe.id,
                    parameterSets = {};
                parameterSets[storageKey] = recipe.params;
                chrome.storage.sync.get(storageKey, function (result) {
                    if (!result[storageKey]) {
                        chrome.storage.sync.set(parameterSets, function () {
                            console.log("Saved ParameterSets to storage : " + recipe.id);
                        });
                    } else {
                        console.log("ParameterSets already found : " + recipe.id);
                    }
                });

            }
        });
    });
})();