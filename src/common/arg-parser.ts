import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

interface Args {
  input: string;
  output: string;
}

const parseArgs = (fileDir: string): { inputFile: string, outputFile: string } => {
  const argv = yargs(hideBin(process.argv))
    .option('input', {
      alias: 'i',
      type: 'string',
      description: 'Input file path',
      demandOption: true
    })
    .option('output', {
      alias: 'o',
      type: 'string',
      description: 'Output file path',
      demandOption: true
    })
    .help()
    .alias('help', 'h')
    .argv as Args;

  const rootDir = path.resolve(__dirname, '../../');
  const prefixInput = `input/${fileDir}/${argv.input}`
  const inputFile = path.join(rootDir, prefixInput);

  const prefixOutput = `output/${fileDir}/${argv.output}`
  const outputDir = path.join(rootDir, path.dirname(prefixOutput));
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }); // 'recursive: true' ensures parent directories are created if they don't exist
  }
  const outputFile = path.join(rootDir, prefixOutput);

  return { inputFile, outputFile };
};

export default parseArgs;
