var s = document.createElement('script');
s.src = 'https://rawgit.com/nitinsurana/repeatit/master/inject.js';
//@ifdef DEBUG
s.src = chrome.extension.getURL("inject.js");
//@endif
(document.head || document.documentElement).appendChild(s);
s.parentNode.removeChild(s);
