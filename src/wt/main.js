import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import { Worker } from 'worker_threads';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerDataPath = path.join(__dirname, 'worker.js');

const performCalculations = async () => {
  const logicalCores = os.cpus().length;
  const workerCount = logicalCores;
  const workersArray = new Array(workerCount).fill(10);
  workersArray.reduce((acc, item, index) => {
    const value = item + index;
    workersArray[index] = value;
    return value;
  }, 10);
  console.log(workersArray);
  const workers = workersArray.map((item) => {
    return new Worker(workerDataPath, { workerData: item });
  });
  let requests = workers.map((worker) => {
    return new Promise((resolve, reject) => {
      worker.on('message', resolve);
      worker.on('error', reject);
    });
  });
  Promise.allSettled(requests).then((responses) => {
    const resultArray = [];
    responses.forEach((response) => {
      const resultObject = {
        status: '',
        data: 0,
      };
      if (response.status === 'fulfilled') {
        resultObject.status = 'resolved';
        resultObject.data = response.value;
      }
      if (response.status === 'rejected') {
        resultObject.status = 'error';
        resultObject.data = null;
      }
      resultArray.push(resultObject);
    });
    console.log(resultArray);
  });
};

await performCalculations();
