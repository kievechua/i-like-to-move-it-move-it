const chokidar = require('chokidar');
const fs = require('fs-extra');
const shortid = require('shortid');
const path = require('path');
const defaultConfig = require('./config/i_like_to_move_it_move_it');

module.exports = function (config = {}) {
  config = Object.assign(defaultConfig, config)

  chokidar
    .watch(`${process.cwd()}/${config.pattern}`)
    .on('add', async function (filePath) {
      const file = path.parse(filePath)
      const basePath = `${file.dir}/logs`
      const destOri = `${basePath}/_latest-${file.base}`
      const dest = `${basePath}/${shortid.generate()}-${file.base}`

      try {
        if (config.history) {
          await fs.copy(filePath, destOri, { overwrite: true })
          console.log(`Successfully copy ${filePath} to ${destOri}`);

          await fs.move(filePath, dest)
          console.log(`Successfully move ${filePath} to ${dest}`);
        } else {
          await fs.move(filePath, destOri, { overwrite: true })
          console.log(`Successfully move ${filePath} to ${destOri}`);
        }
      } catch (err) {
        console.error(err)
      }
    });
};
