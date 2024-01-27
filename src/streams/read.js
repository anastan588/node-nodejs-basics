import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const fileToRead = path.join(__dirname, 'files', 'fileToRead.txt');
  const stream = fs.createReadStream(fileToRead);
  stream.on('data', (chunk)=> {
    process.stdout.write(chunk);
  })
};

await read();
