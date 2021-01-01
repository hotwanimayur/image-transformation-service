const { createLogger } = require('./logger');
const axios = require('axios');
const { imageService } = require('./ImageService')
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
    //processing remote or hosted image url from request
    processRemoteUrl(req, res).then(processedRemoteUrl => {
      //calling Image Service methods to execute required feature based on request parameters passed by user
      imageService.resizeImage(processedRemoteUrl, req).then(finalResponse => {
        res.contentType('image/' + finalResponse.format + '');
        res.send(finalResponse.data)
      }).catch(err => {
        logger.error(err)
        err.message ? res.send({ error: err.message }) : res.send({ error: err })
      }); //end resizeImage

    }).catch(err => {
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    }); //end processRemoteUrl
  });//end route /magic-image/resize-image

  api.route('/magic-image/change-format').get((req, res) => {
    logger.info("Inside change-format api call")
    processRemoteUrl(req, res).then(processedRemoteUrl => {
      imageService.changeImageFormat(processedRemoteUrl, req).then(finalResponse => {
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
    processRemoteUrl(req, res).then(processedRemoteUrl => {
      imageService.cropImage(processedRemoteUrl, req).then(finalResponse => {
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
    processRemoteUrl(req, res).then(processedRemoteUrl => {
      imageService.rotateImage(processedRemoteUrl, req).then(finalResponse => {
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
    processRemoteUrl(req, res).then(processedRemoteUrl => {
      imageService.applyGrayscaleFilter(processedRemoteUrl, req).then(finalResponse => {
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
    processRemoteUrl(req, res).then(processedRemoteUrl => {
      imageService.posterizeImage(processedRemoteUrl, req).then(finalResponse => {
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
function processRemoteUrl(req, res) {
  return new Promise((resolve, reject) => {
    axios({ url: req.query.url, responseType: "arraybuffer" }).then(response => {
      let processedRemoteUrl = response.data;
      resolve(processedRemoteUrl);
    }).catch(err => {
      logger.error(customErrorMessage.invalid_incomplete_image_url)
      reject(err)
    })
  })
}

