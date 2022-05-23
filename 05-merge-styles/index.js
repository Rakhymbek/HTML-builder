const {createWriteStream, readdir, readFile} = require('fs');
const path = require('path');

const bundleFrom = path.join(__dirname, 'styles');
const bundleTo = path.join(__dirname, 'project-dist');
const cssExt = '.css';

const ws = createWriteStream(path.join(bundleTo, 'bundle.css'));

readdir(bundleFrom, {withFileTypes: true}, (err, data) => {
  if(err) throw err;

  data.forEach((file) => {
    if(file.isFile() && path.extname(file.name) === cssExt) {
      readFile(path.join(bundleFrom, file.name), (err, chunk) => {
        if(err) throw err;
        ws.write(chunk + '\n');
      });
    }
  });
}); 