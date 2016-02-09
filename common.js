window.recipe = {};
window.recipelist = [
    'PassageCreateRecipe'
];

window.recipe.Recipe = function(steps) {
    this.start = function () {
    };
    this.stop = function () {
    };
    this.steps = steps;
    this.wait = 20;      //seconds
};

window.recipe.RecipePlayer = function(recipe) {
    var index = 0;
    var waitCount = 0;
    var play = function (steps, index) {
        if (index == steps.length) {
            return;
        }
        var c = setInterval(function () {
            var s = steps[index];
            var $ele = $(s.selector);
            if ($ele.length > 0) {
                doAction($ele, s.action);
                clearInterval(c);
                waitCount = 0;
                play(steps, ++index);
            } else {
                console.log("Looking for " + s.selector);
                waitCount++;
                var count = steps.wait || recipe.wait;
                if (waitCount > count) {
                    waitCount = 0;
                    index--;
                }
            }
        }, 500);
    };
    var doAction = function ($this, action) {
        if (typeof action === 'function') {
            action.call($this);
        } else {
            switch (action) {
                case 'click':
                    $this.click();
                    break;
                default :
                    $this.click();
            }
        }
    };
    typeof recipe.start === 'function' && recipe.start.call(recipe);

    play(recipe.steps, index);

    typeof recipe.stop === 'function' && recipe.stop.call(recipe);
};
