import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const fileToCompress = path.join(__dirname, 'files', 'fileToCompress.txt');
  try {
    await fs.promises.access(fileToCompress, fs.constants.F_OK);
  } catch {
    console.error('Error: fileToCompress.txt does not exist.');
    return;
  }
  const streamToCompress = fs.createReadStream(fileToCompress);
  const fileToOut = path.join(__dirname, 'files', 'archive.gz');
  const streamToOut = fs.createWriteStream(fileToOut);
  const gzip = zlib.createGzip();
  streamToCompress.pipe(gzip).pipe(streamToOut);
  streamToOut.on('finish', () => {
    console.log('Compression completed successfully.');
    fs.unlink(fileToCompress, (err) => {
      if (err) {
        console.error('Failed to delete original file:', err.message);
      } else {
        console.log('Original file deleted.');
      }
    });
  });
};

await compress();
