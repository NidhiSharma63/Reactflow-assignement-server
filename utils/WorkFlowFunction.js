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
  // console.log({ data }, JSON.parse(data), typeof data);

  /** if type of data is string then parse it to json */
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
};

const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const convertToJson = (data) => {
  try {
    const jsonString = JSON.stringify(data); // Log to verify JSON string
    return jsonString;
  } catch (error) {
    console.error("Error converting data to JSON:", error);
    throw error; // Propagate error
  }
};

const sendPostRequest = async (data) => {
  // Assuming 'buffer' is the buffer of your file
  // const fileContent = buffer.toString("utf8"); // Convert buffer to string

  // Create a JSON payload with the file content
  const payload = {
    fileContent: data,
  };

  try {
    // console.log("Sending request with file content...");
    const response = await axios.post("https://nidhisharma.requestcatcher.com/", payload, {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error during POST request:", error.message);
    throw error;
  }
};

export { convertToJson, filterData, parseCsv, sendPostRequest, wait };
