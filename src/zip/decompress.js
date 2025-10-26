import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const fileToDeCompress = path.join(__dirname, 'files', 'archive.gz');
  try {
    await fs.promises.access(fileToDeCompress, fs.constants.F_OK);
  } catch {
    console.error('Error: archive.gz does not exist.');
    return;
  }
  const streamToDeCompress = fs.createReadStream(fileToDeCompress);
  const fileToOut = path.join(__dirname, 'files', 'fileToCompress.txt');
  const streamToOut = fs.createWriteStream(fileToOut);
  const unzip = zlib.createGunzip();
  streamToDeCompress.pipe(unzip).pipe(streamToOut);
  streamToOut.on('finish', () => {
    console.log('Decompression completed successfully.');
    fs.unlink(fileToDeCompress, (err) => {
      if (err) {
        console.error('Failed to delete archive:', err.message);
      } else {
        console.log('Archive file deleted.');
      }
    });
  });
};

await decompress();
