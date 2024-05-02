import axios from "axios";
import Papa from "papaparse";

const parseCsv = (buffer) => {
  return new Promise((resolve, reject) => {
    const csvString = buffer.toString("utf8");
    Papa.parse(csvString, {
      header: true,
      complete: (results) => {
        // console.log(results.data, "parsed data");
        return resolve(results.data);
      },
      error: (error) => reject(error),
    });
  });
};

const filterData = (data, step) => {
  try {
    // check if the data is csv or not
    if (data?.buffer) {
      const csvString = data.buffer.toString("utf8");
      const rows = csvString.split("\n").map((row) => row.split(","));
      if (rows.length < 1) {
        throw new Error("Empty CSV data.");
      }

      // Get header row to find the column index
      const headers = rows[0];
      const columnIndex = headers.findIndex((header) => header.trim() === step.filterValue);

      // Check if the column exists
      if (columnIndex === -1) {
        throw new Error(`Missing column '${step.filterValue}' in the CSV file`);
      }

      // Process each row
      const processedRows = rows.map((row, rowIndex) => {
        if (rowIndex === 0) return row; // Return the header as is

        const cellValue = row[columnIndex];
        // Check if the cell contains only alphabetic characters and then convert to lowercase
        if (cellValue && isNaN(Number(cellValue))) {
          row[columnIndex] = cellValue.toLowerCase();
        }
        return row;
      });

      // Join processed rows back into a CSV string
      return processedRows.map((row) => row.join(",")).join("\n");
    } else {
      const jsonData = typeof data === "string" ? JSON.parse(data) : data;

      // Validate that the provided field exists
      if (jsonData.length > 0 && !(step.filterValue in jsonData[0])) {
        throw new Error(`Missing column '${step.filterValue}' in the file`);
      }

      // Iterate over each item and convert the specified field to lowercase if non-numeric
      const processedData = jsonData.map((item) => {
        if (item[step.filterValue] && isNaN(Number(item[step.filterValue]))) {
          item[step.filterValue] = item[step.filterValue].toLowerCase();
        }
        return item;
      });

      return processedData;
    }
    // csv string

    // if (data?.buffer) {
    //   throw new Error("The Filter Data is not applicable to CSV file");
    // }
    // if (typeof data === "string") {
    //   data = JSON.parse(data);
    // }
    // console.log({ data });
    // return data.map((item) => {
    //   return Object.fromEntries(
    //     Object.entries(item).map(([key, value]) => {
    //       // Check if the value is a string and convert it to lowercase
    //       return [key, typeof value === "string" ? value.toLowerCase() : value];
    //     })
    //   );
    // });
  } catch (error) {
    throw new Error(error);
    // return error;
  }
};

const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const sendPostRequest = async (data) => {
  try {
    // check if the data is csv or not
    const isCSV = data?.buffer ? true : false;
    if (isCSV) {
      //  Create a form data object with the file
      const formData = new FormData();
      formData.append("csvFile", data.buffer);

      // Send the POST request
      const response = await axios.post("https://nidhisharma.requestcatcher.com/", formData);
      // console.log("Response:", response.data);
      return response.data;
    } else {
      // Create a JSON payload with the file content
      const payload = {
        fileContent: data,
      };
      // Send the POST request
      const response = await axios.post("https://nidhisharma.requestcatcher.com/", payload, {
        headers: { "Content-Type": "application/json" || "multipart/form-data" },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error during POST request:", error.message);
    throw new Error("Error during POST request");
  }
};

export { filterData, parseCsv, sendPostRequest, wait };
