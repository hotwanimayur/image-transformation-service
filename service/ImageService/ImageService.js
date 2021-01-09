const sharp = require('sharp');
const { customErrorMessage } = require('../../ErrorDictionary/ErrorDictionary')
const { createLogger } = require('../../logger/logger');
const logger = createLogger();

const ImageService = {

  resizeImage: (processedRemoteUrl, resizeParams) => {
    return new Promise((resolve, reject) => {

      if (resizeParams.resizeWidth && resizeParams.resizeHeight) {
        logger.info("Resizing image for width= " + resizeParams.resizeWidth + " and height= " + resizeParams.resizeHeight);
        sharp(processedRemoteUrl)
          .resize(resizeParams.resizeWidth, resizeParams.resizeHeight)
          .toBuffer((err, data, info) => {
            handleSharpResponse(err, data, info).then(info => { resolve(info) })
              .catch(err => { reject(err) });
          });//end sharp toBuffer
      }
      else
        handleInvalidQueryParamsError(reject);
    })
  },

  changeImageFormat: (processedRemoteUrl, format) => {
    return new Promise((resolve, reject) => {

      if (format) {
        logger.info("Converting image into format= " + format);
        sharp(processedRemoteUrl)
          .toFormat(format)
          .toBuffer((err, data, info) => {
            handleSharpResponse(err, data, info).then(info => { resolve(info) })
              .catch(err => { reject(err) });
          });//end sharp toBuffer
      }
      else
        handleInvalidQueryParamsError(reject)
    })
  },

  cropImage: (processedRemoteUrl, cropImageParams) => {
    return new Promise((resolve, reject) => {
      if (cropImageParams.leftOffset && cropImageParams.topOffset && cropImageParams.cropRegionwidth && cropImageParams.cropRegionheight) {
        logger.info("Crop image called");
        //crop image
        sharp(processedRemoteUrl)
          .extract({
            left: cropImageParams.leftOffset,
            top: cropImageParams.topOffset,
            width: cropImageParams.cropRegionwidth,
            height: cropImageParams.cropRegionheight
          })
          .toBuffer((err, data, info) => {
            handleSharpResponse(err, data, info).then(info => { resolve(info) })
              .catch(err => { reject(err) });
          });//end sharp toBuffer
      }
      else
        handleInvalidQueryParamsError(reject)
    })
  },

  rotateImage: (processedRemoteUrl, angleOfRotation) => {
    return new Promise((resolve, reject) => {

      if (angleOfRotation) {
        logger.info("Rotating image by " + angleOfRotation + " degree");
        //rotate image
        sharp(processedRemoteUrl)
          .rotate(angleOfRotation)
          .toBuffer((err, data, info) => {
            handleSharpResponse(err, data, info).then(info => { resolve(info) })
              .catch(err => { reject(err) });
          });//end sharp toBuffer
      }
      else
        handleInvalidQueryParamsError(reject)
    })
  },

  applyGrayscaleFilter: (processedRemoteUrl, grayScaleFilter) => {
    return new Promise((resolve, reject) => {
      if (grayScaleFilter) {
        logger.info("Applying grayscale filter");
        //gray scale image
        sharp(processedRemoteUrl)
          .grayscale()
          .toBuffer((err, data, info) => {
            handleSharpResponse(err, data, info).then(info => { resolve(info) })
              .catch(err => { reject(err) });
          });//end sharp toBuffer
      }
      else
        handleInvalidQueryParamsError(reject)
    })
  },

  posterizeImage: (processedRemoteUrl, colourSpaceValue) => {
    return new Promise((resolve, reject) => {

      if (colourSpaceValue) {
        logger.info("Posterizing Image");
        //posterize image
        sharp(processedRemoteUrl)
          .toColourspace(colourSpaceValue)
          .toBuffer((err, data, info) => {
            handleSharpResponse(err, data, info).then(info => { resolve(info) })
              .catch(err => { reject(err) });
          });//end sharp toBuffer
      }
      else
        handleInvalidQueryParamsError(reject)
    })
  }
  //end Functions
};

//function to handle response from the sharp library function calls to avoid repetitive code
function handleSharpResponse(err, data, info) {
  logger.info("Handling Sharp Response")
  return new Promise((resolve, reject) => {
    if (err) {
      reject(err)
    } else {
      //pushing output image data from "data" into "info" json 
      //info json also contains some information about image like format, size which are useful while sending response to client
      info.data = data
      resolve(info);
    }//end if-else
  })//end Promise
}//end handleSharpResponse

function handleInvalidQueryParamsError(reject) {
  logger.error(customErrorMessage.invalid_incomplete_query_parameters);
  reject(customErrorMessage.invalid_incomplete_query_parameters);
}

module.exports = ImageService;
