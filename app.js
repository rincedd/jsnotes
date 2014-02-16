var express = require('express'),
    app = express();

var docroot = __dirname + '/docs';
app.use(express.directory(docroot));
app.use(express.static(docroot));

app.listen(3000);
console.log('Listening on port 3000');
