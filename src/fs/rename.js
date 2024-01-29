import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const sourceFile = path.join(__dirname, 'files', 'wrongFilename.txt');
  const destinationFile = path.join(__dirname, 'files', 'properFilename.md');;
  fs.access(destinationFile, (err) => {
    if (err) {
      fs.access(sourceFile, (err) => {
        if (err) {
          console.log(
            "FS operation failed: File 'wrongFilename.txt' doesn't exist"
          );
        } else {
          fs.rename(sourceFile, destinationFile, function (error, files) {
            if (error) return console.log(error);
            console.log(
              "Files 'wrongFilename.txt' has been renamed to 'properFilename.md'"
            );
          });
        }
      });
    } else {
      console.log(
        "FS operation failed: File 'properFilename.md' already exist"
      );
    }
  });
};

await rename();
