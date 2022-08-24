export const csvToArray = (str: string, delimiter = ',') => {
  const lines = str.split(/\r\n|\n|\r/);
  const headers = lines[0].split(delimiter);
  lines.shift();
  const rows = lines;
  const arr = rows.map((row) => {
    const values = row.match(/("[^"]*")|[^,]+/g);
    const el = headers.reduce<any>((object, header, index) => {
      let cleanValue = values ? values[index] : '';
      if (cleanValue.charAt(0) === '"') {
        cleanValue = cleanValue.substring(1);
      }
      if (cleanValue.charAt(cleanValue.length - 1) === '"') {
        cleanValue = cleanValue.substring(0, cleanValue.length - 1);
      }
      object[header] = cleanValue;
      return object;
    }, {});
    return el;
  });
  return arr;
};
