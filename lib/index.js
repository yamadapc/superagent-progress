var ProgressBar = require('progress');
var superagent = require('superagent');

exports = module.exports = function(options) {
  if(!options) options = {}
  if(options instanceof superagent.Request)
    return attachSuperagentProgress({}, options);
  return attachSuperagentProgress.bind(null, options);
};

function attachSuperagentProgress(options, req) {
  var pg;

  req.on('request', function(req) {
    attachSuperagentProgress(options, req.req);
  });

  req.on('response', function(res) {
    var total = +(res.headers['content-length'] || res.headers['Content-Length']);
    var pg = new ProgressBar('[:bar] :current/:total', {
      total: total,
      current: 0,
    });

    res.on('data', function(e) {
      pg.tick(e.length);
    });
  });
}
