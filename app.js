var express=require("express");
var multer  = require('multer');
var app=express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var done=false;
var fs = require("fs");
var file = "./db/imagography.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE images (imageName TEXT, path TEXT)");
  }
});
/*Configure the multer.*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({ dest: './public/uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path);
  console.log(file);
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO images VALUES(?,?)");
    var oName=file.path;
    var trimName=oName.replace('public','');
    stmt.run(file.originalname, trimName);
    stmt.finalize();
  });
  done=true;
}
}));

/*Handling routes.*/
app.use('/', routes);

app.post('/api/photo',function(req,res){
  if(done==true){
    //console.log(req.files);
    res.end("File uploaded.");
  }
});

/*Run the server.*/
app.listen(3000,function(){
    console.log("Working on port 3000");
});