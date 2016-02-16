(function () {
    chrome.runtime.onInstalled.addListener(function () {
        chrome.storage.sync.clear();

        var recipesJsonUrl = 'https://rawgit.com/nitinsurana/repeatit/master/src/recipes.json';
        //@ifdef DEBUG
        recipesJsonUrl = chrome.extension.getURL('recipes.json');
        //@endif
        $.ajax({
            url: recipesJsonUrl,
            dataType: 'json'
        }).done(function (response) {
            window.recipelist = response;
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
    });
})();