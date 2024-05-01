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

const filterData = (data) => {
  /** if type of data is string then parse it to json */
  try {
    if (data?.buffer) {
      throw new Error("The Filter Data is not applicable to CSV file");
    }
    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    return data.map((item) => {
      return Object.fromEntries(
        Object.entries(item).map(([key, value]) => {
          // Check if the value is a string and convert it to lowercase
          return [key, typeof value === "string" ? value.toLowerCase() : value];
        })
      );
    });
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
