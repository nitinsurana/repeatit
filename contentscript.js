var s = document.createElement('script');
//s.src = chrome.extension.getURL("inject.js");
s.src = 'https://raw.githubusercontent.com/nitinsurana/repeatit/master/inject.js';
(document.head||document.documentElement).appendChild(s);
s.parentNode.removeChild(s);