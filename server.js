'use strict';

var express = require('express');
var cors = require('cors');
const formidable = require('formidable'),
	fs = require('fs'),
	path = require('path');
// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', function(req, res) {
	var form = new formidable.IncomingForm();
	console.log(req.body);
	form.parse(req, function(err, fields, files) {
		console.log("files=", files);
		if (!files.upfile) {
			res.status(422).json({
				error: "No file in request"
			})
		}
		if (err) {
			res.status(500).json({
				error: err
			})
		}
		else {
			res.json({
        filename:files.upfile.name,
				size: files.upfile.size
			})
		}
	});
});

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
