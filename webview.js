const path = require('path');

module.exports = (Franz, options) => {

    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    var count = 0;
    // Listen to message from child window
    eventer(messageEvent,function(e) {
        if(e.data.match('"capii_c_ucmc"')) {
            var parts = e.data.split(",");
            count = parts[1];  
            Franz.setBadge(count);
        }
    },false);

  document.querySelector('title').innerText = 'Common Hangouts';
  document.querySelector('link[rel="shortcut icon"]').href = path.join(__dirname, 'icons', 'ch-favicon.ico');
  // document.querySelector('#gb').innerHTML = '<div style="background-image: url("' + path.join(__dirname, 'icons', 'common-h-icons.png') + '") no-repeat;" id="gb_common">&nbsp;</div>'
  
  var checkC = document.querySelector('body[viewport-id="gtn-roster-iframe-id-b"]');
  if (checkC){
    var mailU = document.location.pathname.match(/\d/i);

    var oldVid = document.querySelector('[id=":h.p"]');
    var newVid = oldVid.cloneNode(true);
    oldVid.parentNode.replaceChild(newVid, oldVid);

    function openVid(){
      var wW = screen.width*.8;
      var wH = screen.height*.8;
      var wL = (screen.width-wW)/2;
      var wT = ((screen.height-wH)/2)-50;
      window.open('//hangouts.google.com/hangouts/_/?authuser='+mailU+'','','width='+wW+',height='+wH+',left='+wL+',top='+wT+',location=0,menubar=0,scrollbars=0,status=0,toolbar=0,resizable=1');
    }

    newVid.addEventListener('click', openVid, false);
  }
    
  // inject franz.css stylesheet
  Franz.injectCSS(path.join(__dirname, 'css', 'google-hangouts-common.css'));
};