const { createLogger } = require('../logger/logger');
const axios = require('axios');
const ImageService = require('../service/ImageService/ImageService')
const { customErrorMessage } = require('../ErrorDictionary/ErrorDictionary')
const logger = createLogger();

exports.addRoutes = function addRoutes(api) {

  api.route('/hello').get((req, res) => {
    const name = req.query.name || "stranger";
    res.send({ message: `Hello ${name}!` });
  });

  // Magic Image API routes to handle all Features based on the request parameters provided by customer

  api.route('/magic-image/resize-image').get(async (req, res) => {
    logger.info("Inside resize-image api call")
    let resizeParams = {
      resizeWidth: parseInt(req.query.w),
      resizeHeight: parseInt(req.query.h)
    }
    //processing remote or hosted image url from request
    let processedRemoteUrl = await processRemoteUrl(req.query.url).catch(err => {
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    });
    let finalResponse = await ImageService.resizeImage(processedRemoteUrl, resizeParams).catch(err => {
      logger.error(err)
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    });
    res.contentType('image/' + finalResponse.format + '');
    res.send(finalResponse.data)
  });

  api.route('/magic-image/change-format').get(async (req, res) => {
    logger.info("Inside change-format api call")
    let format = req.query.format;
    let processedRemoteUrl = await processRemoteUrl(req.query.url).catch(err => {
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    });
    ImageService.changeImageFormat(processedRemoteUrl, format).then(finalResponse => {
      res.contentType('image/' + finalResponse.format + '');
      res.send(finalResponse.data)
    }).catch(err => {
      logger.error(err)
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    }); //end changeImageFormat
  });

  api.route('/magic-image/crop-image').get(async (req, res) => {
    logger.info("Inside crop-image api call")
    let cropImageParams = {
      leftOffset: parseInt(req.query.left),
      topOffset: parseInt(req.query.top),
      cropRegionwidth: parseInt(req.query.width),
      cropRegionheight: parseInt(req.query.height)
    }
    let processedRemoteUrl = await processRemoteUrl(req.query.url).catch(err => {
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    });
    let finalResponse = await ImageService.cropImage(processedRemoteUrl, cropImageParams).catch(err => {
      logger.error(err)
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    });
    res.contentType('image/' + finalResponse.format + '');
    res.send(finalResponse.data)
  });

  api.route('/magic-image/rotate-image').get(async (req, res) => {
    logger.info("Inside rotate-image api call")
    let angleOfRotation = parseInt(req.query.rotate);
    let processedRemoteUrl = await processRemoteUrl(req.query.url).catch(err => {
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    });
    let finalResponse = await ImageService.rotateImage(processedRemoteUrl, angleOfRotation).catch(err => {
      logger.error(err)
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    });
    res.contentType('image/' + finalResponse.format + '');
    res.send(finalResponse.data)
  });

  api.route('/magic-image/apply-grayscale').get(async (req, res) => {
    logger.info("Inside apply-grayscale api call")
    let grayScaleFilter = req.query.grayscale || req.query.greyscale;
    let processedRemoteUrl = await processRemoteUrl(req.query.url).catch(err => {
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    });
    let finalResponse = await ImageService.applyGrayscaleFilter(processedRemoteUrl, grayScaleFilter).catch(err => {
      logger.error(err)
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    });
    res.contentType('image/' + finalResponse.format + '');
    res.send(finalResponse.data)
  });

  api.route('/magic-image/posterize-image').get(async (req, res) => {
    logger.info("Inside posterize-image api call")
    let colourSpaceValue = req.query.colourspace || req.query.colorspace;
    let processedRemoteUrl = await processRemoteUrl(req.query.url).catch(err => {
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    });
    let finalResponse = await ImageService.posterizeImage(processedRemoteUrl, colourSpaceValue).catch(err => {
      logger.error(err)
      err.message ? res.send({ error: err.message }) : res.send({ error: err })
    });
    res.contentType('image/' + finalResponse.format + '');
    res.send(finalResponse.data)
  });

}// end routes


//this function will pre process the remote url using axios return the processed url
async function processRemoteUrl(url) {
  let processedRemoteUrl = await axios({ url: url, responseType: "arraybuffer" }).catch(err => {
    logger.error(customErrorMessage.invalid_incomplete_image_url)
    return err;
  })
  return processedRemoteUrl.data;
}

