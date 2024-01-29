import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const fileToDeCompress = path.join(__dirname, 'files', 'archive.gz');
  const streamToDeCompress = fs.createReadStream(fileToDeCompress);
  const fileToOut = path.join(__dirname, 'files', 'fileToCompress.txt');
  const streamToOut = fs.createWriteStream(fileToOut);
  const unzip = zlib.createGunzip();
  streamToDeCompress.pipe(unzip).pipe(streamToOut);
  streamToOut.on('finish', () => {
    console.log('Decompression completed successfully.');
  });
};

await decompress();
