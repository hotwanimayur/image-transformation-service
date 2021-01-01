const sharp = require('sharp');
const { customErrorMessage } = require('./ErrorDictionary')
const { createLogger } = require('./logger');
const logger = createLogger();


var resizeImage = (processedRemoteUrl, req) => {
  return new Promise((resolve, reject) => {
    let resizeWidth = parseInt(req.query.w)
    let resizeHeight = parseInt(req.query.h)

    if (resizeWidth && resizeHeight) {
      logger.info("Resizing image for width= " + resizeWidth + " and height= " + resizeHeight);
      sharp(processedRemoteUrl)
        .resize(resizeWidth, resizeHeight)
        .toBuffer((err, data, info) => {
          handleSharpResponse(err, data, info).then(info => { resolve(info) }).catch(err => { reject(err) });
        });//end sharp toBuffer
    }
    else {
      //Storing custom error messages in ErrorDictionary file as json, key value pair and using it here
      logger.error(customErrorMessage.invalid_incomplete_query_parameters);
      reject(customErrorMessage.invalid_incomplete_query_parameters);
    }//end if-elseif-else

  })
}


var changeImageFormat = (processedRemoteUrl, req) => {
  return new Promise((resolve, reject) => {
    let format = req.query.format;
    if (format) {
      logger.info("Converting image into format= " + format);
      sharp(processedRemoteUrl)
        .toFormat(format)
        .toBuffer((err, data, info) => {
          handleSharpResponse(err, data, info).then(info => { resolve(info) }).catch(err => { reject(err) });
        });//end sharp toBuffer
    }
    else {
      logger.error(customErrorMessage.invalid_incomplete_query_parameters);
      reject(customErrorMessage.invalid_incomplete_query_parameters);
    }//end if-else
  })
}

var cropImage = (processedRemoteUrl, req) => {
  return new Promise((resolve, reject) => {
    let leftOffset = parseInt(req.query.left)
    let topOffset = parseInt(req.query.top)
    let cropRegionwidth = parseInt(req.query.width)
    let cropRegionheight = parseInt(req.query.height)
    if (leftOffset && topOffset && cropRegionwidth && cropRegionheight) {
      logger.info("Crop image called");
      //crop image
      sharp(processedRemoteUrl)
        .extract({ left: leftOffset, top: topOffset, width: cropRegionwidth, height: cropRegionheight })
        .toBuffer((err, data, info) => {
          handleSharpResponse(err, data, info).then(info => { resolve(info) }).catch(err => { reject(err) });
        });//end sharp toBuffer
    }
    else {
      logger.error(customErrorMessage.invalid_incomplete_query_parameters);
      reject(customErrorMessage.invalid_incomplete_query_parameters);
    }//end if-else

  })
}

var rotateImage = (processedRemoteUrl, req) => {
  return new Promise((resolve, reject) => {
    let angleOfRotation = parseInt(req.query.rotate);
    if (angleOfRotation) {
      logger.info("Rotating image by " + angleOfRotation + " degree");
      //rotate image
      sharp(processedRemoteUrl)
        .rotate(angleOfRotation)
        .toBuffer((err, data, info) => {
          handleSharpResponse(err, data, info).then(info => { resolve(info) }).catch(err => { reject(err) });
        });//end sharp toBuffer
    }
    else {
      logger.error(customErrorMessage.invalid_incomplete_query_parameters);
      reject(customErrorMessage.invalid_incomplete_query_parameters);
    }//end if-else
  })
}

var applyGrayscaleFilter = (processedRemoteUrl, req) => {
  return new Promise((resolve, reject) => {
    if (req.query.grayscale === "" || req.query.greyscale === "") {
      logger.info("Applying grayscale filter");
      //gray scale image
      sharp(processedRemoteUrl)
        .grayscale()
        .toBuffer((err, data, info) => {
          handleSharpResponse(err, data, info).then(info => { resolve(info) }).catch(err => { reject(err) });
        });//end sharp toBuffer
    }
    else {
      logger.error(customErrorMessage.invalid_incomplete_query_parameters);
      reject(customErrorMessage.invalid_incomplete_query_parameters);
    }//end if-else
  })
}

var posterizeImage = (processedRemoteUrl, req) => {
  return new Promise((resolve, reject) => {
    let colourSpaceValue = req.query.colourspace || req.query.colorspace;
    if (colourSpaceValue) {
      logger.info("Posterizing Image");
      //posterize image
      sharp(processedRemoteUrl)
        .toColourspace(colourSpaceValue)
        .toBuffer((err, data, info) => {
          handleSharpResponse(err, data, info).then(info => { resolve(info) }).catch(err => { reject(err) });
        });//end sharp toBuffer
    }
    else {
      logger.error(customErrorMessage.invalid_incomplete_query_parameters);
      reject(customErrorMessage.invalid_incomplete_query_parameters);
    }//end if-else
  })
}


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

//end Functions
exports.imageService = {resizeImage, changeImageFormat, cropImage, rotateImage, applyGrayscaleFilter, posterizeImage};


