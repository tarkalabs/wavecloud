var path = require('path'),
    express = require('express'),
    waveform = require('./waveform');

module.exports = function (app) {
  app.use('/public', express.static(path.join(__dirname, '..', '..', 'public')));

  app.get('/', waveform.index);
};
