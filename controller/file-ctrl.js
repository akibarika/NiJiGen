var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var util = require('util');
var appRoot = path.join(__dirname, '..');
var setting = require('../config/setting.json');

exports.upload = function (req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';

    form.keepExtensions = false;

    //limit file size
    form.maxFieldsSize = 2 * 1024 * 1024;

    var imageDir = appRoot + setting.image_dir;
    var temDir = appRoot + setting.tmp_dir;

    form.uploadDir = temDir;

    form.parse(req, function (err, fields, files) {
        var imagePath = path.resolve(imageDir, files.file.name);
        fs.rename(files.file.path, imagePath, function (err) {
            if (err) {
                res.json({'success': false, 'msg': err});
            } else {
                var image_url = setting.image_url + '/' + files.file.name;
                res.json({'success': true, 'msg': 'Success!', 'image_url': image_url});
            }
        });

    });


}

exports.download = function (req, res) {
    var filename = req.params.filename;
    var dir = setting.image_dir;
    var file_path = path.resolve(dir, filename);
    fs.exists(file_path, function (exists) {
        if (!exists) {
            res.json({'success': false, 'msg': '404 not found'});
        } else {
            res.download(file_path, function (err) {
                if (err) {
                    res.json({'success': false, 'msg': err});
                }
            })
        }
    });
}