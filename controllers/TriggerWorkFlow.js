import WorkFlow from "../schema/WorkFlowSchema.js";
import { convertToJson, filterData, parseCsv, sendPostRequest, wait } from "../utils/WorkFlowFunction.js";

import { io } from "../utils/Socket.js";
const triggerWorkFlow = async (req, res) => {
  const { file } = req;
  const { workflowId } = req.body;

  try {
    if (!file) {
      throw new Error("No CSV file uploaded");
    }

    const workflow = await WorkFlow.findOne({ workFlowId: workflowId });
    if (!workflow) {
      throw new Error("Workflow not found");
    }

    const sequence = workflow.workFlowSequence;
    let data;

    for (const step of sequence) {
      // Emitting an update at the start of each step
      io.emit("workflowUpdate", { workflowId, step, status: "InProgress" });

      switch (step) {
        case "Start":
          data = await parseCsv(file.buffer);
          io.emit("workflowUpdate", { workflowId, step, status: "In Progress" });
          break;
        case "Filter Data":
          io.emit("workflowUpdate", { workflowId, step, status: "In Progress" });
          data = await filterData(data);
          break;
        case "Convert Format":
          io.emit("workflowUpdate", { workflowId, step, status: "In Progress" });
          data = convertToJson(data);
          break;
        case "Send Post Request":
          io.emit("workflowUpdate", { workflowId, step, status: "In Progress" });
          await sendPostRequest(data);
          break;
        case "Wait":
          io.emit("workflowUpdate", { workflowId, step, status: "In Progress" });

          await wait(60000);
          break;
        case "End":
          // Emitting an update at the end of the workflow
          io.emit("workflowUpdate", { workflowId, step, status: "In Progress" });
          break;
        default:
          throw new Error(`Unknown step: ${step}`);
      }
    }

    res.status(200).send("Workflow completed successfully");
  } catch (error) {
    io.emit("workflowUpdate", { workflowId, error: error.message, status: "Error" });
    res.status(500).send(error.message);
  }
};
export { triggerWorkFlow };
