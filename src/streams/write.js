import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const fileToWrite = path.join(__dirname, 'files', 'fileToWrite.txt');
  const stream = fs.createWriteStream(fileToWrite, { flags: 'a' });
  process.stdin.on('data', (data) => {
    let information = data.toString().trim();
    if (information.toLowerCase() === 'exit') {
      process.stdin.emit('end');
      return;
    }
    stream.write(`${information}\n`);
  });
  process.stdin.on('end', () => {
    stream.end();
    console.log(
      `Finished writing to fileToWrite.txt. All data has been saved.`
    );
  });
  process.on('SIGINT', () => {
    stream.end();
    console.log(`\nProcess interrupted. Data has been saved up to this point.`);
    process.exit();
  });
};

await write();
