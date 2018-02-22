var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/notes', function(req, res, next) {
    console.log('notes')
    //res.send('respond with a respond');
});

router.post('/notes/add', function(req, res, next) {
    var note = req.body.note
    console.log('add note' ,note)
  });

router.post('/notes/edit', function(req, res, next) {
    var note = req.body.note
    console.log(note)
});

router.post('/notes/delete', function(req, res, next) {
    console.log('delete')
    res.send('respond with a def');
});

module.exports = router;
