'use strict';

var PORT = 4000;

var http = require('http');
var md = require('md5');

var server = http.createServer(function(req, res) {
  console.log('method:', req.method);
  console.log('url:', req.url);
  var urlParts = req.url.match(/[^/]+/g);

  console.log('urlParts:', urlParts)

  switch(urlParts[0]) {
    case 'time':
      var timestamp = Date.now();
      res.end(timestamp + '\n');
      break;
    case 'math':
      if(urlParts[1] === 'add') {
        var numbers = urlParts.splice(2,urlParts.length-2)
        console.log(urlParts.splice(2,urlParts.length-2)+"\n");

        var sumStr = numbers.reduce(function(a,b){
          return parseInt(a)+parseInt(b);
        });
        res.end(sumStr + '\n');
      }
      else if(urlParts[1] === 'square'){
        var number = urlParts.pop();
        res.end(number*number+ '\n');
      }
      break;
    case 'gravatar':
      var mdthatshit = 'http://www.gravatar.com/avatar/'+md(urlParts[1]);
      res.end(mdthatshit+ '\n');
      break;
    case 'sentence':
      var parts = urlParts[1].split('%20');
      var spaces = parts.length-1;
      var words = parts.length;
      var letters = parts.join('').length;
      var obj = {letters: letters, spaces: spaces, words: words};
      res.end(JSON.stringify(obj));
    default:
      res.end("nothing");
  }

});

server.listen(PORT, function() {
  console.log('Node server listening on port ' + PORT);
});;
