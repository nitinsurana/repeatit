!function(){window.recipe={},window.recipe.Recipe=function(e){this.start=function(){},this.stop=function(){},this.steps=e,this.wait=20};var e=function(e,t){var i=document.getElementsByTagName(e);return i[t]},t=function(e){return e&&"undefined"!==e?e="object"!=typeof e?JSON.parse(window.decodeURIComponent(e)):e:void 0};window.recipe.RecipePlayer=function(i,n){var c=0,r=0,s=function(n,c){if(c!=n.length)var a=setInterval(function(){var p=n[c];if("recipe"===p.type){clearInterval(a),r=0;var l=window.recipe[p.recipeId];"function"==typeof l.start&&l.start.call(l,t(p.params)),n.splice.apply(n,[c,1].concat(l.steps)),s(n,c)}else{var u=p.selector?$(p.selector):$(e(p.tagName,p.index));if(u.length>0)o(u,p.action,p.value),clearInterval(a),r=0,s(n,++c);else{console.log("Looking for "+p.selector+"  "+p.tagName+"   "+p.index),r++;var d=n.wait||i.wait;r>d&&(r=0,c--)}}},500)},o=function(e,t,i){if("function"==typeof t)t.call(e);else switch(t){case"input":e.val(window.recipe.utils.evaluate(i));break;case"redactor":e.redactor("set",window.recipe.utils.evaluate(i));break;case"redactorInsert":e.redactor("getObject").insertHtml(window.recipe.utils.evaluate(i));break;default:e.click()}};"function"==typeof i.start&&i.start.call(i,t(n)),s(i.steps.slice(),c),"function"==typeof i.stop&&i.stop.call(i)},window.recipe.utils={evaluate:function(e){return e=e.replace(/{datetime}/g,(new Date).toUTCString()),e=e.replace(/{date}/g,(new Date).toDateString()),e=e.replace(/{time}/g,(new Date).toTimeString())}}}(),function(){var e=[{type:"recipe",recipeId:"CreateAssessmentRecipe"},{type:"recipe",recipeId:"OpenQuestionAuthoringRecipe",params:{qtype:123}},{type:"recipe",recipeId:"FillEssayRecipe",params:{questionTitle:"Creating Essay Question - {datetime}"}}];window.recipe.EssayCreateRecipe=new window.recipe.Recipe(e)}(),function(){var e=[{selector:"#question-raw-content",action:"redactor"},{type:"recipe",recipeId:"FillSolutionHintRecipe",params:{solution:"This is sample solution",hint:"This is sample hint"}},{selector:"#saveQuestionDetails1",action:"click"}],t=window.recipe.FillEssayRecipe=new window.recipe.Recipe(e);t.start=function(e){this.steps[0].value=e.questionTitle}}(),function(){var e=[{selector:"#question-raw-content",action:"redactorInsert"},{selector:".text-drop-val:eq(0)"},{selector:".text-drop-down-input:eq(0)",action:function(){this.val("Choice 1").trigger("focusout")}},{selector:".text-drop-val:eq(1)"},{selector:".text-drop-down-input:eq(1)",action:function(){this.val("Choice 2").trigger("focusout")}},{selector:".text-drop-val:eq(2)"},{selector:".text-drop-down-input:eq(2)",action:function(){this.val("Choice 3").trigger("focusout")}},{selector:".text-drop-val:eq(2)"},{selector:".select-icon-text-drop-down:eq(1)"},{selector:".accept_answer"},{type:"recipe",recipeId:"FillSolutionHintRecipe",params:{solution:"This is sample solution",hint:"This is sample hint"}},{selector:"#saveQuestionDetails1",action:"click"}],t=window.recipe.FillTextDropdownRecipe=new window.recipe.Recipe(e);t.start=function(e){this.steps[0].value=e.questionTitle;var t=Math.round(Math.random());this.steps[7].selector=".text-drop-val:eq("+t+")",this.steps[8].selector=".select-icon-text-drop-down:eq("+t+")"}}(),function(){var e=[{selector:"#question-raw-content",action:"redactorInsert"},{selector:".get-user-entry",action:function(){this.val("Correct Answer").trigger("keyup")},value:"Correct Answer"},{selector:".accept_answer"},{type:"recipe",recipeId:"FillSolutionHintRecipe",params:{solution:"This is sample solution",hint:"This is sample hint"}},{selector:"#saveQuestionDetails1",action:"click"}],t=window.recipe.FillTextEntryRecipe=new window.recipe.Recipe(e);t.start=function(e){this.steps[0].value=e.questionTitle}}(),function(){var e=[{selector:"#question-raw-content",action:"redactor"},{selector:".true-false-answer-select:eq(0)",action:"click"},{type:"recipe",recipeId:"FillSolutionHintRecipe",params:{solution:"This is sample solution",hint:"This is sample hint"}},{selector:"#saveQuestionDetails1",action:"click"}],t=window.recipe.FillTrueFalseRecipe=new window.recipe.Recipe(e);t.start=function(e){this.steps[0].value=e.questionTitle;var t=Math.round(Math.random());this.steps[1].selector=".true-false-answer-select:eq("+t+")"}}(),function(){var e=[{selector:"#login-email",action:"input"},{selector:"#login-password",action:"input"},{selector:"#signIn"}],t=window.recipe.LoginRecipe=new window.recipe.Recipe(e);t.start=function(e){this.steps[0].value=e.email,this.steps[1].value=e.password}}(),function(){var e=[{type:"recipe",recipeId:"CreateAssessmentRecipe"},{selector:"span.lsm-create-btn:first"},{selector:"#qtn-passage-type",wait:100},{selector:"#passage_title",action:"redactor",value:"Passage Title {datetime}"},{selector:".tab-title-text",action:function(){$(this).html("title...")}},{selector:"#question-edit-passage-text",action:"redactor",value:"Something Random {datetime}"},{selector:"#saveQuestionDetails1",action:"click"},{selector:".add-question[style]",action:"click"},{type:"recipe",recipeId:"OpenQuestionAuthoringRecipe",params:{qtype:120}},{type:"recipe",recipeId:"FillTrueFalseRecipe",params:{questionTitle:"p0 {datetime}"}},{selector:".as-question-editor-back"},{selector:".add-question[style]",action:"click"},{type:"recipe",recipeId:"OpenQuestionAuthoringRecipe",params:{qtype:120}},{type:"recipe",recipeId:"FillTrueFalseRecipe",params:{questionTitle:"p1 {datetime}"}},{selector:".as-question-editor-back"},{selector:".add-question[style]",action:"click"},{type:"recipe",recipeId:"OpenQuestionAuthoringRecipe",params:{qtype:120}},{type:"recipe",recipeId:"FillTrueFalseRecipe",params:{questionTitle:"p2 {datetime}"}},{selector:".as-question-editor-back"}];window.recipe.PassageCreateRecipe=new window.recipe.Recipe(e)}(),function(){var e=[{type:"recipe",recipeId:"CreateAssessmentRecipe"},{type:"recipe",recipeId:"OpenQuestionAuthoringRecipe",params:{qtype:129}},{type:"recipe",recipeId:"FillTextDropdownRecipe",params:{questionTitle:"Creating Text Dropdown Question - {datetime}"}}];window.recipe.TextDropdownCreateRecipe=new window.recipe.Recipe(e)}(),function(){var e=[{type:"recipe",recipeId:"CreateAssessmentRecipe"},{type:"recipe",recipeId:"OpenQuestionAuthoringRecipe",params:{qtype:125}},{type:"recipe",recipeId:"FillTextEntryRecipe",params:{questionTitle:"Creating Normal Text Entry Question - {datetime}"}}];window.recipe.TextEntryCreateRecipe=new window.recipe.Recipe(e)}(),function(){var e=[{type:"recipe",recipeId:"CreateAssessmentRecipe"},{type:"recipe",recipeId:"OpenQuestionAuthoringRecipe",params:{qtype:120}},{type:"recipe",recipeId:"FillTrueFalseRecipe",params:{questionTitle:"Creating Normal True False {datetime}"}}];window.recipe.TrueFalseCreateRecipe=new window.recipe.Recipe(e)}(),function(){var e=[{selector:"#create-assessment-with-val"}],t=window.recipe.CreateAssessmentRecipe=new window.recipe.Recipe(e);t.start=function(){var e="#createAssessment/close?cm=assessment";Backbone.history.navigate(e),Backbone.history.loadUrl(e)}}(),function(){var e=[{selector:"#content-solution",action:"redactor"},{selector:"#content-hint",action:"redactor"}],t=window.recipe.FillSolutionHintRecipe=new window.recipe.Recipe(e);t.start=function(e){this.steps[0].value=e.solution,this.steps[1].value=e.hint}}(),function(){var e=[{selector:"span.lsm-create-btn:visible:eq(0)"},{selector:"#qtn-true-false-type",action:"click"}],t=window.recipe.OpenQuestionAuthoringRecipe=new window.recipe.Recipe(e);t.start=function(e){var t="#";switch(e.qtype){case 120:t+="qtn-true-false-type";break;case 125:t+="qtn-text-entry-type";break;case 123:t+="qtn-essay-type";break;case 129:t+="qtn-text-drop-down-type";break;case 122:t+="qtn-multiple-selection-type";break;case 116:t+="qtn-multiple-choice-type"}this.steps[1].selector=t}}(),function(){var e=window.recipe.Recorder={isRecording:!1,startRecording:function(){this.steps=[],this.isRecording=!0},stopRecording:function(){return this.isRecording=!1,this.steps},addEvent:function(e){this.isRecording&&this.steps.push(e)}},t=function(e,t){var i=document.getElementsByTagName(e);return Array.prototype.indexOf.call(i,t)},i=function(i){var n=i.target,c=n.tagName,r=t(c,n),s={tagName:c,index:r,action:event.type};e.addEvent(s)},n=function(){window.addEventListener("message",function(e){if("FROM_REPEATIT"===e.data.type)switch(e.data.action){case"START_RECORDING":window.recipe.Recorder.startRecording();break;case"STOP_RECORDING":var t=window.recipe.Recorder.stopRecording(),i=window.recipe["RecordingRecipe-"+e.data.recordingCount]=new window.recipe.Recipe;i.steps=t}},!1);var e=document.body;e.addEventListener("click",i,!0)};n()}();