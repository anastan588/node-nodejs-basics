import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const fileToRemove = path.join(__dirname, 'files','fileToRemove.txt');
    fs.access(fileToRemove, (err) => {
        if (err) {
          console.log("FS operation failed: File 'fileToRemove.txt' doesn't exist");
        } else {
            fs.unlink(fileToRemove, (error) => {
                if (error) return console.log(error); 
                console.log("File 'fileToRemove.txt' has been deleted");
              });;
        }
      });
};

await remove();