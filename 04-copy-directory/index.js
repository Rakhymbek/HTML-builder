const path = require('path');
const {copyFile, mkdir, rm, readdir} = require('fs').promises;
const fromCopy = path.join(__dirname, 'files');
const toCopy = path.join(__dirname, 'files-copy');

async function copyDir(pathFrom, pathTo) {
  await rm(pathTo, {recursive: true, force: true});
  await mkdir(pathTo);
  let files = await readdir(pathFrom);
  //   console.log(files);

  for (let file of files) {
    let fileCopyFrom = path.join(pathFrom, file);
    let fileCopyTo = path.join(pathTo, file);
    await copyFile(fileCopyFrom, fileCopyTo);
    // console.log(file);  
  }
}
copyDir(fromCopy, toCopy);