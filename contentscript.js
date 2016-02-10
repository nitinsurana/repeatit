var s = document.createElement('script');
//s.src = chrome.extension.getURL("inject.js");             //Un-comment for local extension testing
s.src = 'https://rawgit.com/nitinsurana/repeatit/master/inject.js';
(document.head || document.documentElement).appendChild(s);
s.parentNode.removeChild(s);
