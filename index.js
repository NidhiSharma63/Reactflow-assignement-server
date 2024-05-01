import connectDB from "./utils/ConnectToDB.js";
import { server } from "./utils/Socket.js";
// export const app = express();

// server.use(cors());
// // middleware for routes

// server.use(express.json());
// // for brwoser
// server.use(express.urlencoded({ extended: false }));
// /** handle error */
// server.use("/api/v1", router);

// server.use(errorHandle);
// creating a start function that will connect to database and run the app
const start = async () => {
  try {
    await connectDB(process.env.MONGOOSE_URI);
    server.listen(process.env.PORT ?? 3000, console.log("running at port", process.env.PORT ?? 3000));
  } catch (error) {
    console.log("::error::", error);
  }
};
start();
