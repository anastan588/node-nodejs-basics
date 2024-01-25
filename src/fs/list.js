import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
  const folderPath = path.join(__dirname, 'files');
  fs.access(folderPath, (err) => {
    if (err) {
      console.log("FS operation failed: Files folder doesn't exist");
    } else {
      fs.readdir(folderPath, (error, files) => {
        if (error) return console.log(error);
        const arrayOfFileNames = []
        files.forEach((file) => {
          arrayOfFileNames.push(file.valueOf());
        });
        console.log(arrayOfFileNames);
      });
    }
  });
};

await list();
