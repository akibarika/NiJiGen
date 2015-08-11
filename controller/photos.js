var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var appRoot = path.join(__dirname, '..');
var join = path.join;

exports.submit = function (req, res,next) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = false;
    form.maxFieldsSize = 2 * 1024 * 1024;
    var imageDir = appRoot + '/public/images';
    var temDir = appRoot + '/public/images/tmp'
    form.uploadDir = temDir;
    form.parse(req, function (err, fields, files) {
        var img = files.image;

        var name = fields.name || img.name;
        console.log(fields);
        var imagePath = path.resolve(imageDir, img.name);
        fs.rename(img.path, imagePath, function (err) {
            if (err) return next(err);
            Photo.create({
                name: name,
                path: img.name
            }, function (err) {
                if (err) return next(err);
                res.redirect('/list');
            });
        });
    });

};

exports.download = function (dir) {
    return function (req, res, next) {
        var id = req.params.id;
        Photo.findById(id, function (err, photo) {
            if (err) return next(err);
            var path = join(dir, photo.path);
            res.download(path, photo.name + '.jpeg');
        });
    };
};
