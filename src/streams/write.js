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
    stream.write(`${information}\n`);
  });
  process.stdin.on('end', () => {
    stream.end();
  });
};

await write();
