import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const copy = async () => {
  const sourceDir = path.join(__dirname, 'files');
  const destinationDir = path.join(__dirname, 'files_copy');
  fs.access(sourceDir, (err) => {
    if (err) {
      console.log("FS operation failed: Files folder doesn't exist");
    } else {
      fs.access(destinationDir, (err) => {
        if (err) {
          fs.mkdir(destinationDir, function (error, files) {
            if (error) return console.log(error);
            console.log('Files_copy folder has been created');
          });
          fs.readdir(sourceDir, (error, files) => {
            if (error) return console.log(error);
            files.forEach((file) => {
              const sourceFilePath = path.join(sourceDir, file);
              const destinationFilePath = path.join(destinationDir, file);
              console.log(sourceFilePath);
              console.log(destinationFilePath);
              fsPromises.copyFile(sourceFilePath, destinationFilePath);
            });
          });
        } else {
          console.log('FS operation failed: Files_copy folder already exist');
        }
      });
    }
  });
};

await copy();
