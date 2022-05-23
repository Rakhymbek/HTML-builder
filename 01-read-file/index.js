const path = require('path');
const fs = require('fs'); 

const rs = fs.createReadStream(path.join(__dirname, 'text.txt'));

rs.on('data', response => console.log(response.toString()));


//Second way to solve the task
/* let data = null;
fs.readFile(path.join(__dirname, 'text.txt'), (err, fileData) => {
  if (err) throw err;
  data = fileData;
  console.log(data.toString());
}); */ 