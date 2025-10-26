import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptPath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const childProcess = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  process.stdin.pipe(childProcess.stdin);

  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);

  childProcess.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(['winter', 'spring', 'summer', 'autumn']);
