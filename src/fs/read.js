import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const filePathToRead = path.join(__dirname, 'files', 'fileToRead.txt');
  fs.access(filePathToRead, (err) => {
    if (err) {
      console.log("FS operation failed: File 'fileToRead.txt' doesn't exist");
    } else {
        fs.readFile(filePathToRead, 'utf-8', (error, data) => {
            if (error) return console.log(error); 
            console.log(data);
          });;
    }
  });
};

await read();
