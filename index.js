const path = require('path');
const os = require('os');

module.exports = path.resolve(__dirname, os.platform() === 'win32' ? 'ffmpeg.exe' : 'ffmpeg');