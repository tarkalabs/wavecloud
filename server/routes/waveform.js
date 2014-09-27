var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec;

function waveformCLI(mediaFile, imageFile) {
  return 'waveform -i ' + mediaFile + ' ' +
         '-h 100 -t 25 -w 300 -m -o ' + imageFile;
}

function generateWaveform(mediaFile, imagePath, callback) {
  var imageFile = path.join(imagePath, path.basename(mediaFile, '.mp3')) + '.png';
  exec(waveformCLI(mediaFile, imageFile), function (error, stdout, stderr) {
    if (error) {
      console.log('dispensing error message:');
      console.log(error, stdout, stderr);
      console.log('error message dispensed');
    }
    callback(imageFile);
  });
}

function generateWaveforms(mediaPath, imagePath, callback) {
  fs.readdir(mediaPath, function (err, files) {
    var results = [];
    var mp3files = _.filter(files, function (name) {
      return /.*\.mp3$/.test(name);
    });
    _.each(mp3files, function (mediaFile) {
      var name = path.basename(mediaFile, '.mp3').replace(/_/g, ' ');
      var mediaFilePath = path.join(mediaPath, mediaFile);
      generateWaveform(mediaFilePath, imagePath, function (imageFile) {
        results.push({
          name: name,
          mediaFile: mediaFilePath,
          imageFile: imageFile
        });
        if (results.length === mp3files.length) {
          callback(results);
        }
      });
    });
  });
}

module.exports = {
  index: function (req, res) {
    generateWaveforms('public/media', 'public/img', function (waveforms) {
      res.render('index', {waveforms: waveforms});
    });
  }
};
