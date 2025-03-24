// Create web server and listen on port 3000
// Usage: node comments.js
// Output: Server running at http://localhost:3000/

var http = require('http');
var fs = require('fs');
var qs = require('querystring');

http.createServer(function (req, res) {
  if (req.url === '/form' && req.method === 'GET') {
    fs.readFile('form.html', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  if (req.url === '/form' && req.method === 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      var post = qs.parse(body);
      fs.appendFile('comments.txt', post.comment + '\n', function (err) {
        if (err) throw err;
        console.log('Comment saved');
      });
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Your comment has been saved: ' + post.comment);
    });
  }
}).listen(3000);

console.log('Server running at http://localhost:3000/');
// End of comments.js
// Usage: node comments.js
// Output: Server running at http://localhost:3000/
// Open http://localhost:3000/form in a web browser
// Enter a comment and submit the form
// The comment will be saved in comments.txt
// The comment will be displayed in the web browser
// Press Ctrl+C to stop the server
// Comments are saved in comments.txt
// Comments are displayed in the web browser
// Comments are saved in comments.txt
// Comments are displayed in the web browser
// Comments are saved in comments.txt