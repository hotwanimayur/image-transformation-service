const { createLogger } = require('./logger');
const axios = require('axios');
const ImageService = require('./ImageService')
const { customErrorMessage } = require('./ErrorDictionary')
const logger = createLogger();
exports.addRoutes = function addRoutes(api) {

  api.route('/hello').get((req, res) => {
    const name = req.query.name || "stranger";
    res.send({ message: `Hello ${name}!` });
  });

  // Magic Image API routes to handle all Features based on the request parameters provided by customer

  api.route('/magic-image/resize-image').get((req, res) => {
    logger.info("Inside resize-image api call")
    let resizeParams = {
      resizeWidth: parseInt(req.query.w),
      resizeHeight: parseInt(req.query.h)
    }
    //processing remote or hosted image url from request
    processRemoteUrl(req.query.url).then(processedRemoteUrl => {
      ImageService.resizeImage(processedRemoteUrl, resizeParams).then(finalResponse => {
        res.contentType('image/' + finalResponse.format + '');
        res.send(finalResponse.data)
      }).catch(err => {
        logger.error(err)
        err.message ? res.send({ error: err.message }) : res.send({ error: err })
      }); //end changeImageFormat
    }).catch(err => {
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    }); //end processRemoteUrl
  });//end route /magic-image/resize-image

  api.route('/magic-image/change-format').get((req, res) => {
    logger.info("Inside change-format api call")
    let format = req.query.format;
    processRemoteUrl(req.query.url).then(processedRemoteUrl => {
      ImageService.changeImageFormat(processedRemoteUrl, format).then(finalResponse => {
        res.contentType('image/' + finalResponse.format + '');
        res.send(finalResponse.data)
      }).catch(err => {
        logger.error(err)
        err.message ? res.send({ error: err.message }) : res.send({ error: err })
      }); //end changeImageFormat
    }).catch(err => {
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    }); //end processRemoteUrl

  });//end route /magic-image/change-format

  api.route('/magic-image/crop-image').get((req, res) => {
    logger.info("Inside crop-image api call")
    let cropImageParams = {
      leftOffset: parseInt(req.query.left),
      topOffset: parseInt(req.query.top),
      cropRegionwidth: parseInt(req.query.width),
      cropRegionheight: parseInt(req.query.height)
    }
    processRemoteUrl(req.query.url).then(processedRemoteUrl => {
      ImageService.cropImage(processedRemoteUrl, cropImageParams).then(finalResponse => {
        res.contentType('image/' + finalResponse.format + '');
        res.send(finalResponse.data)
      }).catch(err => {
        logger.error(err)
        err.message ? res.send({ error: err.message }) : res.send({ error: err })
      }); //end cropImage

    }).catch(err => {
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    }); //end processRemoteUrl

  });//end route /magic-image/crop-image

  api.route('/magic-image/rotate-image').get((req, res) => {
    logger.info("Inside rotate-image api call")
    let angleOfRotation = parseInt(req.query.rotate);
    processRemoteUrl(req.query.url).then(processedRemoteUrl => {
      ImageService.rotateImage(processedRemoteUrl, angleOfRotation).then(finalResponse => {
        res.contentType('image/' + finalResponse.format + '');
        res.send(finalResponse.data)
      }).catch(err => {
        logger.error(err)
        err.message ? res.send({ error: err.message }) : res.send({ error: err })
      }); //end rotateImage

    }).catch(err => {
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    }); //end processRemoteUrl

  });//end route /magic-image/rotate-image

  api.route('/magic-image/apply-grayscale').get((req, res) => {
    logger.info("Inside apply-grayscale api call")
    let grayScaleFilter = req.query.grayscale || req.query.greyscale;
    processRemoteUrl(req.query.url).then(processedRemoteUrl => {
      ImageService.applyGrayscaleFilter(processedRemoteUrl, grayScaleFilter).then(finalResponse => {
        res.contentType('image/' + finalResponse.format + '');
        res.send(finalResponse.data)
      }).catch(err => {
        logger.error(err)
        err.message ? res.send({ error: err.message }) : res.send({ error: err })
      }); //end applyGrayscaleFilter

    }).catch(err => {
      res.send({ error: err.message })
    }); //end processRemoteUrl

  });//end route /magic-image/apply-grayscale

  api.route('/magic-image/posterize-image').get((req, res) => {
    logger.info("Inside posterize-image api call")
    let colourSpaceValue = req.query.colourspace || req.query.colorspace;
    processRemoteUrl(req.query.url).then(processedRemoteUrl => {
      ImageService.posterizeImage(processedRemoteUrl, colourSpaceValue).then(finalResponse => {
        res.contentType('image/' + finalResponse.format + '');
        res.send(finalResponse.data)
      }).catch(err => {
        logger.error(err)
        err.message ? res.send({ error: err.message }) : res.send({ error: err })
      }); //end posterizeImage
    }).catch(err => {
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    }); //end processRemoteUrl
  });//end route /magic-image/posterize-image

}

//this function will pre process the remote url using axios and also report error if any
function processRemoteUrl(url) {
  return new Promise((resolve, reject) => {
    axios({ url: url, responseType: "arraybuffer" }).then(response => {
      let processedRemoteUrl = response.data;
      resolve(processedRemoteUrl);
    }).catch(err => {
      logger.error(customErrorMessage.invalid_incomplete_image_url)
      reject(err)
    })
  })
}

