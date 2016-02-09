$(function () {

    $("#results").html('<li>Loading...</li>');

    $.ajax({
        url: 'https://rawgit.com/nitinsurana/repeatit/master/recipes.json'
    }).done(function (response) {
        $("#results").empty();
        window.recipelist = [];

        var $results = $("#results");
        for (var i in response) {
            var $li = $("<li>", {
                "data-recipe": response[i].id
            }).html("<span>" + response[i].title + "</span>");
            $results.append($li);
            window.recipelist.push(response[i].id);
        }
    });

    $("#results li").click(function () {
        window.close();
        var recipe = $(this).data('recipe');

        var nn = function () {
            var s = document.createElement('script');
            s.textContent = 'window.recipe.RecipePlayer({recipe})';
            (document.head || document.documentElement).appendChild(s);
            s.parentNode.removeChild(s);
        };

        chrome.tabs.executeScript({
            code: '(' + nn.toString().replace('{recipe}', 'window.recipe.' + recipe) + ')();'
        });
    });
});
