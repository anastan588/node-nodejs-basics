import { Transform } from 'stream';

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const input = chunk.toString().trim();
      if (input.toLowerCase() === 'exit') {
        process.exit(0);
      }
      const reversedChunk = input.split('').reverse().join('');
      this.push(reversedChunk + '\n');
      callback();
    },
  });
  process.on('SIGINT', () => {
    console.log('\nProcess interrupted with Ctrl+C. Exiting...');
    process.exit(0);
  });
  process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();
