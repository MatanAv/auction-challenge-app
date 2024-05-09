import fs from 'fs';
import { Model } from 'mongoose';
import { json2csv } from 'json-2-csv';

class DbCsvExportService<T> {
  private model: Model<T>;
  private modelName: string;

  constructor(model: Model<T>) {
    this.model = model;
    this.modelName = model.collection.collectionName;
  }

  private async exportFile(csv: string): Promise<void> {
    const filename = `./db-exports/${this.modelName}.csv`;

    if (!fs.existsSync('./db-exports')) {
      fs.mkdirSync('./db-exports');
    }

    fs.writeFileSync(filename, csv);

    console.log(`${this.modelName} has been exported.`);
  }

  async exportCollection(): Promise<void> {
    const data = JSON.stringify(await this.model.find());
    const csv = json2csv(JSON.parse(data));
    this.exportFile(csv);
  }

  async exportCollectionByHeaders(headers: string[]): Promise<void> {
    const data = JSON.stringify(await this.model.find());
    const csv = json2csv(JSON.parse(data), { keys: headers, emptyFieldValue: 'null' });
    this.exportFile(csv);
  }
}

export default DbCsvExportService;
