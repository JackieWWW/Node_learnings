// Write an HTTP server that serves JSON data when it receives a GET request to the path '/api/parsetime'. Expect the request to contain a query string with a key 'iso' and an ISO-format time as the value.

// For example:

//   /api/parsetime?iso=2013-08-10T12:10:15.474Z

// The JSON response should contain only 'hour', 'minute' and 'second' properties. For example:

//     {
//       "hour": 14,
//       "minute": 23,
//       "second": 15
//     }

// Add second endpoint for the path '/api/unixtime' which accepts the same query string but returns UNIX epoch time in milliseconds (the number of milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'. For example:

//     { "unixtime": 1376136615474 }

// Your server should listen on the port provided by the first argument to your program.

// -------------------------------------------------------------------------------

// ## HINTS

// The request object from an HTTP server has a url property that you will need to use to "route" your requests for the two endpoints.

// You can parse the URL and query string using the Node core 'url' module. url.parse(request.url, true) will parse content of request.url and provide you with an object with helpful properties.

// For example, on the command prompt, type:

//     $ node -pe "require('url').parse('/test?q=1', true)"

// Documentation on the url module can be found by pointing your browser here:
//   file:///Users/peekay/.nvm/v0.10.40/lib/node_modules/learnyounode/node_apidoc/url.html

// Your response should be in a JSON string format. Look at JSON.stringify() for more information.

// You should also be a good web citizen and set the Content-Type properly:

//     res.writeHead(200, { 'Content-Type': 'application/json' })

// The JavaScript Date object can print dates in ISO format, e.g. new Date().toISOString(). It can also parse this format if you pass the string into the Date constructor. Date#getTime() will also
// come in handy.

var fs = require('fs');
var http = require('http');
var url = require('url');
var port = Number(process.argv[2]);

function parseTime (time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

function unixTime (time) {
  return {
    unixtime: time.getTime()
  }
}

var server = http.createServer(function (req, res) {
  var parseURL = url.parse(req.url, true);
  var time = new Date(parseURL.query.iso);
  var result;

  if (parseURL.pathname === '/api/parsetime'){
    result = parseTime(time);
  } else if (parseURL.pathname === '/api/unixtime') {
    result = unixTime(time);
  }

  if (result) {
    res.writeHead(200, { 'content-type': 'application/json'});
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(port);
