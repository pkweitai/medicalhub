'use strict';


/**
 * Denoise ECG Data
 * This endpoint processes raw ECG data to denoise it.
 *
 * body Body ECG data to be denoised
 * returns inline_response_200
 **/
exports.denoiseECG = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {"empty": false};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Detect Arrhythmia in ECG Data
 * This endpoint processes raw ECG data to detect arrhythmia.
 *
 * body Body_1 ECG data to be analyzed for arrhythmia
 * returns inline_response_200_1
 **/
exports.detectArrhythmia = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {"empty": false};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

