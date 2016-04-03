(function () {
    'use strict';

    var id = "FillClassicAssignmenttoCreateAssignmentLSRecipe";
    var steps = [
        {
            selector: '#ls-ins-assignment-name',
            action: 'click',
        },
        {
            selector: '#ls-ins-edit-assignment',
            action: 'input',
            value: '{datetime} - Assignment Title'
        },
        {
            selector: '#ls-ins-assignment-desc',
            action: 'click',
        },
        {
            selector: '#ls-ins-enter-assignment-desc',
            action: 'input',
            value: '{datetime} - Assignment Description'
        },
        {
            selector: 'body',
            action: 'click'
        }
    ];
    var recipe = window.recipe.FillClassicAssignmenttoCreateAssignmentLSRecipe = new window.recipe.Recipe(steps, id);
})();
