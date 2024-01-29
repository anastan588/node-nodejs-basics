import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const fileToHash = path.join(
    __dirname,
    'files',
    'fileToCalculateHashFor.txt'
  );
  const hash = crypto.createHash('sha256');

  const stream = fs.createReadStream(fileToHash);
  stream.on('data',(data) => {
    hash.update(data);
  });
  stream.on('end', () => {
    const hexHash = hash.digest('hex');
    console.log('SHA256 hash:', hexHash);
  });
};

await calculateHash();
