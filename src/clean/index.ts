import fs from 'fs';
import parseArgs from '../common/arg-parser';
import * as Papa from 'papaparse';
import pgPromise from 'pg-promise';

const { inputFile, outputFile } = parseArgs('clean');

const pgp = pgPromise({});
const db = pgp({
  host: 'localhost',
  port: 54322,
  database: 'postgres',
  user: 'postgres',
  password: 'postgres',
});

async function loadCsv(filePath: string): Promise<any[]> {
  const csvFile = fs.readFileSync(filePath, 'utf8');
  const { data } = Papa.parse(csvFile, { header: true });
  return data;
}

async function createTable(tableName: string, data: any[]): Promise<void> {
  const columns = Object.keys(data[0]).map(col => `${col} text`).join(', ');
  const createTableSql = `CREATE TABLE ${tableName} (${columns});`;

  await db.none(createTableSql);

  for (const row of data) {
    const values = Object.values(row).map(val => `'${val}'`).join(', ');
    const insertSql = `INSERT INTO ${tableName} VALUES (${values});`;
    await db.none(insertSql);
  }
}

async function run() {
  const smallData = await loadCsv(inputFile);
  const largeData = await loadCsv(outputFile);

  await createTable('small_table', smallDatakk);
  await createTable('large_table', largeData);
}

run().catch(console.error);
