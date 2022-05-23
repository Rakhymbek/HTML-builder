const fs = require('fs');
const { stdout, stdin } = process;
const path = require('path');

/* const ws = fs.createWriteStream(path.join(__dirname,'text.txt'));
 */
stdout.write('Hi, write something to test:\n');

stdin.on('data', (data) => {
  if(data.toString().trim() === 'exit') {
    stdout.write('Thanks for the testing, bye!');
    process.exit();
  }
  ws.write(data);
});

process.on('SIGINT', () => {
  stdout.write('Thanks for the testing, bye!');
  process.exit();
});
