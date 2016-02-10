$.ajax({
    url: 'https://rawgit.com/nitinsurana/repeatit/master/recipes.json'
}).done(function (response) {
    chrome.storage.sync.set({'recipelist': response}, function () {
        console.log("Saved recipelist in Chrome Storage");
    });
});
