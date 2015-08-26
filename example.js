var fs = require('fs');
var path = require('path');
var request = require('superagent');
var progress = require('./');

var stream = request.get('https://media.giphy.com/media/ym2AIZujHYCFa/giphy.gif')
  .use(progress)
  .pipe(fs.createWriteStream(path.join(__dirname, 'output.gif')));

stream.on('close', function() {
  console.log('Waiting...');
  setTimeout(function() {
    console.log('Worked?');
  }, 1000);
});
