import WorkFlow from "../schema/WorkFlowSchema.js";
import { convertToJson, filterData, parseCsv, sendPostRequest, wait } from "../utils/WorkFlowFunction.js";

// Helper function to send progress updates

const statusUpdates = {
  status: "InProgress",
  step: "Start",
};

const triggerWorkFlow = async (req, res, next) => {
  try {
    const { file } = req;
    const { workflowId } = req.body;

    if (!file) {
      throw new Error("No CSV file uploaded");
    }

    const workflow = await WorkFlow.findOne({ workFlowId: workflowId });
    if (!workflow) {
      throw new Error("Workflow not found");
    }

    // Assuming workFlowSequence is an array of strings indicating the steps
    const sequence = workflow.workFlowSequence;
    let data;

    for (const step of sequence) {
      switch (step) {
        case "Start":
          statusUpdates.status = "InProgress";
          statusUpdates.step = "Start";
          data = await parseCsv(file.buffer);
          break;

        case "Filter Data":
          statusUpdates.status = "InProgress";
          statusUpdates.step = "Filter Data";
          data = await filterData(data);
          break;

        case "Wait":
          statusUpdates.status = "InProgress";
          statusUpdates.step = "Wait";
          await wait(1000);

          break;

        case "Convert Format":
          statusUpdates.status = "InProgress";
          statusUpdates.step = "Convert Format";
          data = convertToJson(data);
          break;

        case "Send Post Request":
          statusUpdates.status = "InProgress";
          statusUpdates.step = "Send Post Request";
          // console.log({ data });
          await sendPostRequest(data);
          break;

        case "End":
          statusUpdates.status = "InProgress";
          statusUpdates.step = "End";
          break;

        default:
          // Handle unknown steps
          console.log(`Unknown step: ${step}`);
          throw new Error(`Unknown step: ${step}`);
      }
    }

    res.status(200).send("Done");
    statusUpdates.status = "InProgress";
    statusUpdates.step = "Start";

    // res.end();
    // res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getStatusUpdates = async (req, res, next) => {
  try {
    // console.log({ statusUpdates });
    res.send(statusUpdates);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { getStatusUpdates, triggerWorkFlow };
