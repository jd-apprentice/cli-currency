// Imports
import axios from "axios";
import Table from "cli-table";

// Types
type ObjectData<T> = {
  [key: string]: T;
};

// Constants
const dolarAPI = "https://api.bluelytics.com.ar/v2/latest";
let arrData: ObjectData<number>[] = [];
const labelsTable = ["💱 Moneda", "💸 Valor"];
const sizeTable = [50, 50];
const sackEmoji = "💰 "
const arsLabel = " ARS"

// Get data from the api
async function getData(url: string): Promise<number> {
  const response = await axios.get(url);
  const data = await response.data;
  return arrData.push(
    data.oficial,
    data.blue,
    data.oficial_euro,
    data.blue_euro
  );
}

// Generate a new table with the selected properties
function createTable(labels: any, size: number[]) {
  return new Table({
    head: labels,
    colWidths: size,
  });
}

// Main function
async function main() {
  await getData(dolarAPI);
  const table = createTable(labelsTable, sizeTable);
  table.push(
    { '💵 Oficial': sackEmoji + arrData[0].value_avg + arsLabel },
    { '💵 Blue': sackEmoji + arrData[1].value_avg + arsLabel },
    { '💶 Oficial_Euro': sackEmoji + arrData[2].value_avg + arsLabel },
    { '💶 Blue_euro': sackEmoji + arrData[3].value_avg + arsLabel },
  );
  console.log(table.toString());
}

// Init application
main();
