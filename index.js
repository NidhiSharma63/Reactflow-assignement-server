import connectDB from "./utils/ConnectToDB.js";
import { server } from "./utils/Socket.js";
// creating a start function that will connect to database and run the app
const start = async () => {
  try {
    // connect to mongodb
    await connectDB(process.env.MONGOOSE_URI);
    // listen port on 3000
    server.listen(process.env.PORT ?? 3000, console.log("running at port", process.env.PORT ?? 3000));
  } catch (error) {
    console.log("::error::", error);
  }
};
start();
