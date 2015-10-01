var fs = require('fs');
var path = require('path');
var filtered = [];

module.exports = function(dir, ext, callback) {
  fs.readdir(dir, function(err, list) {
    if (err) { return callback(err, null); }

    filtered = list.filter(function(file) {
      return path.extname(file) === '.' + ext;
    });
    callback(null, filtered);
  });
};
