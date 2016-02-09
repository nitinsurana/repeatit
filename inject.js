var steps = [
{
    selector:'#create-assessment-with-val'  
},
{
    selector: 'span.lsm-create-btn:first'
},
{
    selector: '#qtn-passage-type',
    wait: 100
},
{
    selector: '#passage_title',
    action: function(){
        $(this).redactor('set','something random');
    }
},
{
    selector: '.tab-title-text',
    action: function(){
        $(this).html('title...');
    }
},
{
    selector: '#question-edit-passage-text',
    action: function(){
        $(this).redactor('set','something random');
    }
},
{
    selector: '#saveQuestionDetails1',
    action: 'click'
},
{
    selector: '.add-question[style]',
    action: 'click'
},
{
    selector: 'span.lsm-create-btn:visible',
    action: 'click'
},
{
    selector: '#qtn-true-false-type',
    action: 'click'
},
{
    selector: '#question-raw-content',
    action: function(){
        $(this).redactor('set','p0');
    }
},
{
    selector:'.true-false-answer-select:eq(0)',
    action: 'click'
},
{
    selector: '#saveQuestionDetails1',
    action:'click'
},
{
    selector: '.as-question-editor-back'
},
{
    selector: '.add-question[style]',
    action: 'click'
},
{
    selector: 'span.lsm-create-btn:visible',
    action: 'click'
},
{
    selector: '#qtn-true-false-type',
    action: 'click'
},
{
    selector: '#question-raw-content',
    action: function(){
        $(this).redactor('set','p1');
    }
},
{
    selector:'.true-false-answer-select:eq(1)',
    action: 'click'
},
{
    selector: '#saveQuestionDetails1',
    action:'click'
},
{
    selector: '.as-question-editor-back'
},
{
    selector: '.add-question[style]',
    action: 'click'
},
{
    selector: 'span.lsm-create-btn:visible',
    action: 'click'
},
{
    selector: '#qtn-true-false-type',
    action: 'click'
},
{
    selector: '#question-raw-content',
    action: function(){
        $(this).redactor('set','p2');
    }
},
{
    selector:'.true-false-answer-select:eq(0)',
    action: 'click'
},
{
    selector: '#saveQuestionDetails1',
    action:'click'
},
{
    selector: '.as-question-editor-back'
}
];

function Recipe(steps){
    this.start = function(){};
    this.stop = function(){};
    this.steps = steps;
    this.wait = 20;      //seconds
}
var PassageCreateReceipe = new Recipe(steps);
PassageCreateReceipe.start = function(){
    Backbone.history.loadUrl('#createAssessment/close?cm=assessment');
};

var ReceipeList = [PassageCreateReceipe];
//RecipePlayer(ReceipeList[0]);

function RecipePlayer(recipe){
    var index = 0;
    var waitCount = 0;
    var play = function(steps, index){
        if(index == steps.length){
            return;
        }
        var c = setInterval(function(){
            var s = steps[index];
            var $ele = $(s.selector);
            if($ele.length>0){
                doAction($ele,s.action);
                clearInterval(c);
                waitCount = 0;
                play(steps,++index);     
            }else{
                console.log("Looking for " + s.selector);
                waitCount++;
                var count = steps.wait || recipe.wait;
                if(waitCount>count){
                    waitCount = 0;
                    index--;
                }
            }
        },500);
    };
    var doAction = function($this,action){
        if(typeof action === 'function'){
            action.call($this);
        }else{
            switch(action){
                case 'click':
                    $this.click();
                    break;
                default :
                    $this.click();
            }
        }
    };
    typeof recipe.start === 'function' && recipe.start.call(recipe);
    
    play(steps,index);
    
    typeof recipe.stop === 'function' && recipe.stop.call(recipe);
}