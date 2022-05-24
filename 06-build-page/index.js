// const { createWriteStream } = require('fs');
const {mkdir, copyFile, readFile, rm, readdir, writeFile, appendFile} = require('fs/promises');
const path = require('path');


const DistPath = path.join(__dirname, 'project-dist');
const fromCopy = path.join(__dirname, 'assets');
const toCopy = path.join(__dirname, 'project-dist', 'assets');

const stylesPathFrom = path.join(__dirname, 'styles');
const stylesPathTo = path.join(__dirname, 'project-dist', 'style.css');


async function makeDir() {
  await mkdir(DistPath, {recursive: true});
}
makeDir();


async function copyDir(pathFrom, pathTo) {
  await rm(pathTo, {recursive: true, force: true});
  await mkdir(pathTo, { recursive: true});
  let files = await readdir(pathFrom,  {withFileTypes: true});
  //   console.log(files);

  for (let file of files) {
    if (file.isFile()) {
      await copyFile(path.join(pathFrom, file.name), path.join(pathTo, file.name));
    } else {
      let fileCopyFrom = path.join(pathFrom, file.name);
      let fileCopyTo = path.join(pathTo, file.name);
      await copyDir(fileCopyFrom, fileCopyTo);
      // console.log(file);  
    }
  }
}
copyDir(fromCopy, toCopy);

async function replaceTagsInTemplate() {
  await writeFile(path.join(DistPath, 'index.html'), '');
  const readComponents = await readdir(path.join(__dirname, 'components'));
  const readTemplate = (await readFile( path.join(__dirname, 'template.html'))).toString();
  let copy = readTemplate;

  for (let file of readComponents) {
    if (file.split('.')[1] === 'html') {
      const dataFromComponents = (await readFile(path.join(path.join(__dirname, 'components'), file))).toString();
      const tagsFromComponent = file.split('.')[0];
      
      let reg = new RegExp('{{' + tagsFromComponent + '}}', 'gi');
      copy = copy.replace(reg, dataFromComponents);
    }
  }
  await appendFile(path.join(DistPath, 'index.html'), copy);
}
replaceTagsInTemplate();

async function bundleStyles() {
  await writeFile(stylesPathTo, '');
  const files = (await readdir(stylesPathFrom, { withFileTypes: true})).reverse();

  for (let file of files) {
    let filePath = path.join(stylesPathFrom, file.name);

    if (path.extname(filePath) === '.css') {
      const data = await readFile(filePath, 'utf-8');
      await appendFile(stylesPathTo, data + '\n');
    }
  }
}
bundleStyles();