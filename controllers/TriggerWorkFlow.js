import WorkFlow from "../schema/WorkFlowSchema.js";
import { filterData, parseCsv, sendPostRequest, wait } from "../utils/WorkFlowFunction.js";

import { io } from "../utils/Socket.js";
const triggerWorkFlow = async (req, res, next) => {
  const { file } = req;
  const { workflowId } = req.body;

  // check if any field is missing or not
  try {
    if (!file) {
      throw new Error("No CSV file uploaded");
    }

    const workflow = await WorkFlow.findOne({ workFlowId: workflowId });
    if (!workflow) {
      throw new Error("Workflow not found");
    }

    const sequence = workflow.workFlowSequence;
    let data = file;

    // console.log(sequence);

    for (const step of sequence) {
      let activeStep = step.type;
      // Emitting an update at the start of each step

      io.emit("workflowUpdate", { workflowId, activeStep, status: "InProgress" });

      switch (step.type) {
        case "Start":
          break;
        case "Filter Data":
          data = await filterData(data, step);
          break;
        case "Convert Format":
          data = await parseCsv(file.buffer);
          break;
        case "Send Post Request":
          await sendPostRequest(data);
          break;
        case "Wait":
          await wait(process.env.ENVIRONMENT === "development" ? 1000 : 60000);
          break;
        case "End":
          // Emitting an update at the end of the workflow
          break;
        default:
          throw new Error(`Unknown step: ${step.type}`);
      }
    }

    res.status(200).send("Workflow completed successfully");
  } catch (error) {
    io.emit("workflowUpdate", { workflowId, error: error.message, status: "Error" });
    next(error);
  }
};
export { triggerWorkFlow };
