var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dialog = require('dialog');
var app = express();

var schemaName = new Schema({
	Name: String,
	Age: String,
	Gender:String
}, {
	collection: 'coll'
});

var Model = mongoose.model('Model', schemaName);
mongoose.connect('mongodb://test:12345678@ds139899.mlab.com:39899/testseries',function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
  else{
	   console.log("We no are connected");
  }
  
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})
app.get('/create', (req, res) => {
  res.sendFile(__dirname + '/index2.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})
app.get('/RD', (req, res) => {
 // res.sendFile(__dirname + '/index3.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.

  res.sendFile(__dirname + '/index3.html')
})
app.get('/Update', (req, res) => {
 // res.sendFile(__dirname + '/index3.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.

  res.sendFile(__dirname + '/index4.html')
})
app.get('/Update1', (req, res) => {
 // res.sendFile(__dirname + '/index3.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.

var na=req.param('name');
Model.update({Name : na}, {$set: {Gender: na}}, function(err, result){

    console.log("Updated successfully");

    console.log(result);
  });
	
		
	res.send("vfdf");
	




})
app.get('/find', (req, res) => {
 // res.sendFile(__dirname + '/index3.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  var dan=req.param('id');
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  Model.findOne({_id: dan}, function(err,obj) { res.json(obj); });
})
app.get('/D', (req, res) => {
 // res.sendFile(__dirname + '/index3.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  Model.find(function(err, beers) {
    if (err)
      res.send(err);

    res.json(beers);
  });
 // res.sendFile(__dirname + '/index3.html')
})
app.get('/Remove', (req, res) => {
 // res.sendFile(__dirname + '/index3.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.

	  var dan=req.param('id');
	  Model.remove({_id:dan}, function(err){
    if(err) throw err;
	res.redirect('/RD');

	  
  });
  })
 // res.sendFile(__dirname + '/index3.html')

app.get('/save',function(req, res) {
	
	var q = req.param('name');
		var q1= req.param('age');
	var q2 = req.param('gender');

	var savedata = new Model({
		'Name': q,
		'Age': q1,
		'Gender': q2
		
		
	}).save(function(err, result) {
		if (err) throw err;

		if(result) {
			
			res.send('sucessfully inserted');
			

		}
	})
	
   
        
        res.redirect('/');
  
    
	
}
  

)

app.get('/find/:query', cors(), function(req, res) {
	var query = req.params.query;

	Model.find({
		'request': query
	}, function(err, result) {
		if (err) throw err;
		if (result) {
			res.json(result)
		} else {
			res.send(JSON.stringify({
				error : 'Error'
			}))
		}
	})
})

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log('Node.js listening on port ' + port);
});