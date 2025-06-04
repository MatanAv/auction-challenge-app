import fs from 'fs';
import { Model } from 'mongoose';
import { json2csv } from 'json-2-csv';

function isIsoDate(str: unknown): boolean {
    if (typeof str !== 'string') return false;
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str);
    return !isNaN(d.getTime()) && d.toISOString() === str; // valid date
}

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
        const csv = json2csv(JSON.parse(data), {
            excelBOM: true,
            useLocaleFormat: true,
            parseValue(fieldValue, defaultParser) {
                if (isIsoDate(fieldValue)) {
                    const parsedDate = new Date(fieldValue as string);
                    return parsedDate.toLocaleString();
                }
                return defaultParser(fieldValue);
            }
        });
        this.exportFile(csv);
    }

    async exportCollectionByHeaders(headers: string[]): Promise<void> {
        const data = JSON.stringify(await this.model.find());
        const csv = json2csv(JSON.parse(data), {
            keys: headers,
            emptyFieldValue: '',
            excelBOM: true,
            useLocaleFormat: true,
            parseValue(fieldValue, defaultParser) {
                if (isIsoDate(fieldValue)) {
                    const parsedDate = new Date(fieldValue as string);
                    return parsedDate.toLocaleString();
                }
                return defaultParser(fieldValue);
            }
        });
        this.exportFile(csv);
    }
}

export default DbCsvExportService;
