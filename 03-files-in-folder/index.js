const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname,'secret-folder');

fs.readdir(folderPath, (err, files) => {
  if(err) throw err;
  //  console.log(files);
  files.forEach((fileData) => {
    fs.stat(path.join(folderPath, fileData), (err, stats) => {
      if(err) throw err;
      if(stats.isFile()) {
        console.log(`${fileData.split('.')[0]} - ${fileData.split('.')[1]} - ${stats.size/1000}kb`);
      }
    });
  });
});
