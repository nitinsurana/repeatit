(function () {
    var steps = [
        {
            selector: 'span.lsm-create-btn:visible:eq(0)'
        },
        {
            selector: '#qtn-true-false-type',
            action: 'click'
        }
    ];
    window.recipe.OpenTFRecipe = new window.recipe.Recipe(steps);
})();