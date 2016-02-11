(function () {
    var recipesJsonUrl = 'https://rawgit.com/nitinsurana/repeatit/master/recipes.json';
    //var recipesJsonUrl = chrome.extension.getURL('recipes.json');       //Un-comment for local new recipes testing
    $.ajax({
        url: recipesJsonUrl,
        dataType:'json'
    }).done(function (response) {
        chrome.storage.sync.set({'recipelist': response}, function () {
            console.log("Saved recipelist in Chrome Storage");
        });
    });
})
();

