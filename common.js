(function () {
    window.recipe = {};

    window.recipe.Recipe = function (steps) {
        this.start = function () {
        };
        this.stop = function () {
        };
        this.preCondition = function () {
            return {status: true};
        };
        this.steps = steps;
        this.wait = 20;      //seconds
    };

    var getSingleElement = function (tagName, index) {
        var elems = document.getElementsByTagName(tagName);
        return elems[index];
    };

    var processParams = function (params) {
        if (!params || params === 'undefined') {
            return;
        }
        //params will be object if injected in another extension as a step, else it'll be an encoded string passed by extension_script (popup.js)
        params = typeof params !== 'object' ? JSON.parse(window.decodeURIComponent(params)) : params;
        return params;
    };

    window.recipe.RecipePlayer = function (recipe, params) {
        var index = 0;
        var waitCount = 0;

        var play = function (steps, index) {
            if (index == steps.length) {
                return;
            }
            var c = setInterval(function () {
                var s = steps[index];
                if (s.type === 'recipe') {
                    clearInterval(c);
                    waitCount = 0;
                    var recipeToInject = window.recipe[s.recipeId];
                    typeof recipeToInject.start === 'function' && recipeToInject.start.call(recipeToInject, processParams(s.params));
                    steps.splice.apply(steps, [index, 1].concat(recipeToInject.steps));
                    play(steps, index);
                } else {
                    var $ele = s.selector ? $(s.selector) : $(getSingleElement(s.tagName, s.index));
                    if ($ele.length > 0) {
                        doAction($ele, s.action, s.value);
                        clearInterval(c);
                        waitCount = 0;
                        play(steps, ++index);
                    } else {
                        console.log("Looking for " + s.selector + "  " + s.tagName + "   " + s.index);
                        waitCount++;
                        var count = steps.wait || recipe.wait;
                        if (waitCount > count) {
                            waitCount = 0;
                            index--;
                        }
                    }
                }
            }, 500);
        };
        var doAction = function ($this, action, val) {
            if (typeof action === 'function') {
                action.call($this);
            } else {
                switch (action) {
                    case 'input':
                        $this.val(window.recipe.utils.evaluate(val));
                        break;
                    case 'redactor':
                        $this.redactor('set', window.recipe.utils.evaluate(val));
                        break;
                    case 'redactorInsert':
                        $this.redactor('getObject').insertHtml(window.recipe.utils.evaluate(val));
                        break;
                    default :
                        $this.click();
                }
            }
        };

        var check = recipe.preCondition.call(recipe);

        if (!check.status) {
            window.alert(check.msg);
            return;
        }
        typeof recipe.start === 'function' && recipe.start.call(recipe, processParams(params));

        play(recipe.steps.slice(), index);      //Using a copy of steps since at the run-time the recipe might contain other recipes as steps

        typeof recipe.stop === 'function' && recipe.stop.call(recipe);
    };

    window.recipe.utils = {
        evaluate: function (str) {
            str = str.replace(/{datetime}/g, new Date().toUTCString());
            str = str.replace(/{date}/g, new Date().toDateString());
            str = str.replace(/{time}/g, new Date().toTimeString());
            return str;
        }
    }

})();

