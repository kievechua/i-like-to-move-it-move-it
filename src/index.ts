const chokidar = require('chokidar');
const fs = require('fs-promise');
const shortid = require('shortid');
const path = require('path');
const defaultConfig = require('./config/i_like_to_move_it_move_it');

module.exports = function (config = {}) {
  config = Object.assign(defaultConfig, config)

  chokidar
    .watch(`${process.cwd()}/${config.pattern}`)
    .on('add', function (filePath) {
      const file = path.parse(filePath)
      const basePath = `${file.dir}/logs`
      const destOri = `${basePath}/_latest-${file.base}`
      const dest = `${basePath}/${shortid.generate()}-${file.base}`

      if (config.history) {
        fs.copy(filePath, destOri, { overwrite: true })
        .then(function () {
          console.log(`Successfully copy ${filePath} to ${destOri}`);
          return fs.move(filePath, dest)
        })
        .then(function () {
          console.log(`Successfully move ${filePath} to ${dest}`);
        })
        .catch(function (err) {
          console.error(err)
        })
      } else {
        fs.move(filePath, destOri, { overwrite: true })
        .then(function () {
          console.log(`Successfully move ${filePath} to ${destOri}`);
        })
        .catch(function (err) {
          console.error(err)
        })
      }
    });
};
