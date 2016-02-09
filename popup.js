$(function () {
    $("#results li").click(function () {
        window.close();
        var recipe = $(this).data('recipe');


        var nn = function() {
            var s = document.createElement('script');
            s.textContent = 'RecipePlayer(window.recipelist[0])';
            (document.head || document.documentElement).appendChild(s);
            s.parentNode.removeChild(s);
        };

        chrome.tabs.executeScript({
            code: '(' + nn + ')();'
        });
    });
});
