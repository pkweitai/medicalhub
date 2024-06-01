'use strict';

var utils = require('../utils/writer.js');
var ECG = require('../service/ECGService');

module.exports.denoiseECG = function denoiseECG (req, res, next) {
  var body = req.swagger.params['body'].value;
  ECG.denoiseECG(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.detectArrhythmia = function detectArrhythmia (req, res, next) {
  var body = req.swagger.params['body'].value;
  ECG.detectArrhythmia(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
