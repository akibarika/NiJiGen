var express = require('express');
var router = express.Router();
var photos = require('../controller/photos');
var Photo = require('../models/Photo');




router.get('/list', function (req, res, next) {
    Photo.find({}, function (err, photos) {
        if (err) return next(err);
        res.render('photos', {
            title: 'Photos',
            photos: photos
        });
    });
});

router.get('/upload', function (req, res) {
    res.render('photos/upload', {
        title: 'Photo Upload'
    });
});

//router.post('/upload', photos.submit());

module.exports = router;
