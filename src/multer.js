const multer = require('multer'),
    path = require('path'),
    maxSize = 1 * 1000 * 1000;

var storage = multer.diskStorage({
    destination: path.join(__dirname + './../public/images/'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

module.exports.uploads = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|png|PNG|svg|bmp|jpeg|JPEG)$/)) {
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }
        cb(null, true);
    }
}).single('image')