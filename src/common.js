(function () {
    'use strict';

    window.recipe = {};

    window.recipe.Recipe = function (steps,recipeId) {
        this.start = function () {
            return $.Deferred().resolve();
        };
        this.stop = function () {
            return $.Deferred().resolve();
        };
		this.getId = function(){
			return recipeId;
		};
        this.steps = steps;
        this.wait = 20;      //10 seconds
    };

    var getSingleElement = function (tagName, index) {
        var elems = document.getElementsByTagName(tagName);
        return elems[index];
    };

    var processParams = function (params) {
        if (!params) {
            return;
        }
        //params will be object if injected in another extension as a step, else it'll be an encoded string passed by extension_script (popup.js)
        params = typeof params !== 'object' ? JSON.parse(window.decodeURIComponent(params)) : params;
        return params;
    };

    window.recipe.RecipePlayer = function (recipe, params) {
        var index = 0;
        var waitCount = 0;
		window.recipe.usageTracker.recipeStart(recipe.getId());
        var play = function (steps, index) {
            if (index === steps.length) {
				recipe.stop.call(recipe);
				if(recipe.getId() === window.recipe.usageTracker.getCurrentRecipe()){
					window.recipe.usageTracker.sendUsageStatistics();	
				}
                return ;
            }
            var c = setInterval(function () {
                var s = steps[index];
                if (s.type === 'recipe') {
                    clearInterval(c);
                    waitCount = 0;
                    var recipeToInject = window.recipe[s.recipeId];
                    //Todo convert below call to handle start promise success & failure
                    recipeToInject.start.call(recipeToInject, processParams(s.params));
                    steps.splice.apply(steps, [index, 1].concat(recipeToInject.steps));
                    play(steps, index);
                } else if (s.type === 'wait') {
                    //Todo implement wait step
                    ++index;
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

        recipe.start.call(recipe, processParams(params))
            .done(function () {
                play(recipe.steps.slice(), index);
				      //Using a copy of steps since at the run-time the recipe might contain other recipes as steps
            }).fail(function (msg) {
                window.alert(msg);
            });
    };

    window.recipe.utils = {
        evaluate: function (str) {
			var self = this;
            str = str.replace(/{datetime}/g, new Date().toUTCString());         //jshint ignore:line
            str = str.replace(/{date}/g, new Date().toDateString());            //jshint ignore:line
            str = str.replace(/{time}/g, new Date().toTimeString());            //jshint ignore:line
			str = str.replace(/{randomString\([\d]*\)}/g,function(match) {
				return self.randomStringReplacer.call(self,match);
			}); //jshint ignore:line
			str = str.replace(/{timeStamp\(?[\d]*\)?}/g,function(match){
				return self.timeStampReplacer.call(self,match);
			}); //jshint ignore:line
            return str;
        },
		randomStringReplacer : function(match){
			var length = match.replace(/[a-zA-Z\(\)\{\}]/g,"");
			length = window.isNaN(window.parseInt(length,10)) ? 5 : window.parseInt(length,10);
			return this.randomString(length);
		},
		timeStampReplacer : function(match){
			var length = match.replace(/[a-zA-Z\(\)\{\}]/g,"");
			length = window.isNaN(window.parseInt(length,10)) ? 13 : window.parseInt(length,10);
			return this.timeStamp(length);
		
		},
		timeStamp: function(length){
			length = length ? length : 13;
			return new Date().getTime().toString().substr(-length);
		},	
		randomString : function (length){
			var lower = "abcdefghijklmnopqrstuvwxyz";
			var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			var allChars = lower.split("").concat(upper.split(''));
			var randomNumbers = [];
			for(var i = 0; i < length ;i++){
				randomNumbers.push(Math.floor(Math.random() * allChars.length));
			}
			return randomNumbers.map(function(index){
				return allChars[index];
			}).join('');
		}
    };
	
	window.recipe.UsageTracker = function(){
		var isRunning = false;
		var currentRecipeId = '';		
		var currentIp = '';
		var startTime = '';
		this.sendUsageStatistics = function(){
			if(!currentRecipeId ){
				return;
			}
			var promise = $.Deferred();
			getLocalIp(promise);
			promise.done(function(){
				postUsage();
			});
		};
		var postUsage = function(){
			var timeNow = new Date().getTime();
			var timeTook = timeNow - startTime;
			var self = this;
			$.ajax({
				//url:'http://localhost:5000/usage',
				url:'https://cors-anywhere.herokuapp.com/https://repeatit.herokuapp.com/usage',
				type:'POST',
				data:{
					recipeName: currentRecipeId,
					at: timeNow,
					internalIp : currentIp,
					totalTime : timeTook
				}
			}).always(function(){
				self.recipeStop();			
			});
		};
		var getLocalIp = function(promise){
			var ips = [];
			var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
			var peerConnection = new RTCPeerConnection({
				iceServers : []
			});
			peerConnection.createDataChannel('');
			peerConnection.onicecandidate = function(e){
				if(!e.candidate){
					peerConnection.close();
					currentIp = ips[0];
					promise.resolve();
					return;
				}
				var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
				if (ips.indexOf(ip) == -1){
					ips.push(ip);
				} // avoid duplicate entries (tcp/udp)
			};
			peerConnection.createOffer(function(sdp) {
				peerConnection.setLocalDescription(sdp);
			}, function onerror() {});
		};
		this.recipeStart = function(id){
			currentRecipeId = id;
			startTime = new Date().getTime();
		};
		this.recipeStop = function(){
			currentRecipeId = '';
			startTime = '';
		};
		this.getCurrentRecipe = function(){
			return currentRecipeId || '';	
		};
	};

	window.recipe.usageTracker = new window.recipe.UsageTracker();


})();

