import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);
console.log(__dirname);

const create = async () => {
  const fileData = 'I am fresh and young\n';
  const fileName = path.join(__dirname, 'files', 'fresh.txt');
  fs.access(fileName, (err) => {
    if (err) {
      fs.writeFile(fileName, fileData, function (error) {
        console.log('File fresh.txt has been created in files folder');
      });
    } else {
      console.log('FS operation failed: file fresh.txt already exist in files folder');
    }
  });
};

await create();
