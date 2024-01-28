import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const fileToCompress = path.join(__dirname, 'files', 'fileToCompress.txt');
  const streamToCompress = fs.createReadStream(fileToCompress);
  const fileToOut = path.join(__dirname, 'files', 'archive.gz');
  const streamToOut = fs.createWriteStream(fileToOut);
  const gzip = zlib.createGzip();
  streamToCompress.pipe(gzip).pipe(streamToOut);
  streamToOut.on('finish', () => {
    console.log('Compression completed successfully.');
  });
};

await compress();
