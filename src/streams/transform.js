import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transform = async () => {
    const fileToWrite = path.join(__dirname, 'files', 'fileToWrite.txt');
  const stream = fs.createWriteStream(fileToWrite, { flags: 'a' });
  // process.stdout.write('Hello, friend) Write something\n');
  // process.stdout.write('Please: write something here:  ');
  process.stdin.on('data', (data) => {
    let information = data.toString().trim();
    console.log(information);
    stream.write(`${information}\n`);
    // stream.end();
    // console.log('Data written to file.');
    
    // process.exit();
  });
  process.stdin.on('end', () => {
    stream.end();
    console.log('Data written to file.');
    process.stdout.write('Good bye! \n');
  });
};

await transform();