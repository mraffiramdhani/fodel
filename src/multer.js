const multer = require('multer'),
    path = require('path'),
    maxSize = 1 * 1000 * 1000;

var imageStorage = multer.diskStorage({
    destination: path.join(__dirname + './../public/images/'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

var logoStorage = multer.diskStorage({
    destination: path.join(__dirname + './../public/logos/'),
    filename: function (req, file, cb) {
        cb(null, 'logo-' + Date.now() +
            path.extname(file.originalname));
    }
});

module.exports.uploadImages = multer({
    storage: imageStorage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|png|PNG|svg|bmp|jpeg|JPEG)$/)) {
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }
        cb(null, true);
    }
}).array('image', 10)

module.exports.uploadLogo = multer({
    storage: logoStorage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|png|PNG|svg|bmp|jpeg|JPEG)$/)) {
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }
        cb(null, true);
    }
}).single('image')