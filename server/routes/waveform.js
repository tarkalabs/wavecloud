var exec = require('child_process').exec;

module.exports = {
  index: function (req, res) {
    exec('waveform -i test.mp3 -h 100 -t 25 -w 400 -m -o public/img/Chaz.png', function (error, stdout, stderr) {
      var waveformPNG = '/public/img/Chaz.png';
      if (error) {
        console.log('dispensing error message:');
        console.log(error);
        console.log(stdout);
        console.log(stderr);
        console.log('error message dispensed');
        waveformPNG = '';
      }
      res.render('index', {waveformPNG: '/public/img/Chaz.png'});
    });
  }
};
