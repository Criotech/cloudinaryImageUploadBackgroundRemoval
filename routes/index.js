const express = require('express');
const router = express.Router();
const { multerUploads, dataUri } = require('../config/multerConfig');
const { cloudinaryConfig, uploader } = require('../config/cloudinaryConfig');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', cloudinaryConfig, multerUploads, (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    return uploader.upload(file,

      {
        public_id: "baseball_no_bg",
        background_removal: "cloudinary_ai",
        width: 70, height: 53, crop: "scale",
      }

    ).then((result) => {
      const image = result.url;
      return res.status(200).json({
        messge: 'Your image has been uploded successfully to cloudinary',
        data: {
          image
        }
      })
    }).catch((err) => res.status(400).json({
      messge: 'someting went wrong while processing your request',
      data: {
        err
      }
    }))
  }
});

module.exports = router;
