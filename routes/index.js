var express = require('express');
var router = express.Router();
var fs = require("fs");
var file = "./db/imagography.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
/* GET home page. */
router.get('/', function(req, res, next) {
  db.serialize(function() {
    var tempJson=[];
    db.each("SELECT * from images", function(err, row) {
        tempJson.push({imageName:row.imageName,path:row.path});
    }, function() {
      res.render('index', { title: 'Imagography', images:tempJson });
    });
  });
});
router.get('/api/listPics', function(req, res) {
  var temp=[];
  var sName=req.query.sName;
  if(sName===undefined){
    sName="";
  }
  db.serialize(function() {
    db.each("SELECT * from images where imageName like '%"+sName+"%'", function(err, row) {
        temp.push({imageName:row.imageName,path:row.path});
    },function() {
        res.end(JSON.stringify(temp));
    });
  });
});
router.get('/api/deleteImage', function(req, res) {
  var imageName=req.query.imageName;
  db.serialize(function() {
    db.each("SELECT * from images where imageName='"+imageName+"'", function(err, row) {
        fs.unlinkSync('./public'+row.path);
    });
    console.log("sd"+imageName+"sd");
    db.run("delete from images where imageName='"+imageName+"'");
    res.end("Done");
  });
});

module.exports = router;
