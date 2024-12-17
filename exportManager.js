export class Exporter {
    export(data) {
        throw new Error("Method 'export' must be implemented")
    }

    getType() {
        throw new Error("Method 'getType' must be implemented")
    }

    getExtension() {
        throw new Error("Method 'getExtension' must be implemented")
    }

    import(data) {
        throw new Error("Method 'import' must be implemented")
    }
}

export class JSONExporter extends Exporter {
    export(data) {
        return JSON.stringify(data);
    }

    getType() {
        return "application/json";
    }

    getExtension() {
        return "json";
    }

    import(data) {
        return JSON.parse(data);
    }
}

export class CSVExporter extends Exporter {
    export(data) {
        const header = Object.keys(data[0]).join(",") + "\n";
        const rows = data.map(row => Object.values(row).map(value => `"${value}"`).join(","));
        return [header, ...rows].join("\n");
    }

    getType() {
        return "text/csv";
    }

    getExtension() {
        return "csv";
    }

    import(data) {
        try {
            const rows = data.split("\n").filter(row => row.trim() !== "");
            if (rows.length < 2) {
                throw new Error("CSV file is empty or missing data rows");
            }

            const headers = this.parseCSVRow(rows[0]);

            const parsedData = rows.slice(1).map((row, rowIndex) => {
                const values = this.parseCSVRow(row);
                if (values.length !== headers.length) {
                    throw new Error(`Invalid column count on row ${rowIndex + 2}. Expected ${headers.length}, got ${values.length}.`);
                }

                const rowObject = {};
                headers.forEach((header, index) => rowObject[header] = values[index]);
                return rowObject;
            })

            return parsedData;
        } catch (error) {
            console.error("Error parsing CSV data", error);
            alert("Error importing CSV file: " + error.message);
            return [];
        }
    }

    parseCSVRow(row) {
        const regex = /(?:^|,)(?:"([^"]*)"|([^",]*))/g;
        const values = [];
        let match;

        while (match = regex.exec(row)) {
            values.push(match[1] || match[2]);
        }

        return values;
    }
}