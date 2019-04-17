'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer')
const fs = require('fs')
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({ dest: 'uploads/' })

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next) {
	console.log(req.file);

	res.json({
		filename: req.file.originalname,
		size: req.file.size
	});
  
	fs.unlink(req.file.path,(err) => {
  if (err) console.error("Can't delete file",req.file.path);
  console.log('Deleted file');
});

});

app.get('/hello', function(req, res) {
	res.json({ greetings: "Hello, API" });
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Node.js listening ...');
});
