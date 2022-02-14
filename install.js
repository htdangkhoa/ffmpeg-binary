const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const os = require('os');

const baseURL = 'https://github.com/htdangkhoa/ffmpeg-binary/releases/download/v5.0';

/**
 * @param {string} url
 * @param {string} dest
 */
const downloadFile = (url, dest) => {
  let func = http.get;

  if (url.startsWith('https')) {
    func = https.get;
  }

  const file = fs.createWriteStream(dest);

  return new Promise((resolve, reject) => {
    func(url, (response) => {
      const { statusCode, headers } = response;
      if (statusCode === 302 && headers.location) {
        return resolve(downloadFile(headers.location, dest));
      }

      response.pipe(file);

      return file.on('finish', () => {
        file.close((err) => {
          if (err) reject(err);
        });

        resolve('Download complete');
      });
    }).on('error', (err) => {
      fs.unlinkSync(dest);

      return reject(err);
    });
  });
};

/**
 * @param {string} dest
 * @param {'darwin' | 'linux' | 'windows'} platform
 * @param {'ia32' | 'amd64' | 'arm' | 'arm64' | 'x32' | 'x64'} arch
 */
const downloadFFmpeg = (dest, platform, arch) => {
  let url = `${baseURL}/ffmpeg-${platform}`;

  if (arch) {
    url += `-${arch}`;
  }

  if (platform === 'windows') {
    url += '.exe';
  }

  return downloadFile(url, dest);
};

const download = async () => {
  const platform = os.platform();
  const arch = os.arch();

  let filepath =  path.resolve(__dirname, 'ffmpeg');

  const print = (...args) => {
    console.log(`Download ffmpeg for ${platform} ${arch}:`, ...args);
  };

  try {
    switch (platform) {
      case 'darwin': {
        const result = await downloadFFmpeg(filepath, 'darwin');

        print(result);

        break;
      }
      case 'linux': {
        let result;

        if (arch === 'arm') {
          result = await downloadFFmpeg(filepath, 'linux', 'arm');
        } else if (arch === 'arm64') {
          result = await downloadFFmpeg(filepath, 'linux', 'arm64');
        } else if (arch === 'x64') {
          result = await downloadFFmpeg(filepath, 'linux', 'amd64');
        } else {
          result = await downloadFFmpeg(filepath, 'linux', 'ia32');
        }

        print(result);

        break;
      }
      case 'win32': {
        filepath += '.exe';

        let result;

        if (arch === 'x64') {
          result = await downloadFFmpeg(filepath, 'windows', 'x64');
        } else {
          result = await downloadFFmpeg(filepath, 'windows', 'x32');
        }

        print(result);

        break;
      }
      default:
        throw new Error('Unknown');
    }

    fs.chmodSync(filepath, 0o755);
  } catch (error) {
    console.error(error);
  }
};

download();
