var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Tasklist page. */
router.get('/tasklist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('tasklist', {
            "tasklist" : docs
        });
    });
});

/* GET New Task page. */
router.get('/newtask', function(req, res) {
    res.render('newtask', { title: 'Add New Task' });
});

/* POST to Add Task Service */
router.post('/addtask', function(req, res) {

    var db = req.db;
    var collection = db.get('usercollection');
    
    //get the task to add from the request
    var task = req.body.task;

    // Submit to the DB
    collection.insert({
        "task" : task
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.location("tasklist");
            res.redirect("tasklist");
        }
    });
});

module.exports = router;
