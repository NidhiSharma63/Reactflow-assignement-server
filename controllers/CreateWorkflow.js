import WorkFlow from "../schema/WorkFlowSchema.js";

const createWorkFlow = async (req, res, next) => {
  try {
    const { userId, workFlowSequence, workFlowId, workFlowEdges, workFlowNodes } = req.body;
    if (!userId || !workFlowSequence) throw new Error("Missing Data");

    /**
     * check if workFlow sequence includes start and end more than one times
     */
    const isStartIncludeMoreThanOne = workFlowSequence.filter((step) => step.type === "Start").length > 1;
    const isEndIncludeMoreThanOne = workFlowSequence.filter((step) => step.type === "End").length > 1;

    if (isStartIncludeMoreThanOne) {
      throw new Error("Start should be included only once");
    }

    if (isEndIncludeMoreThanOne) {
      throw new Error("End should be included only once");
    }

    const isFilterDataNodeIncluded = workFlowSequence.filter((node) => node.type === "Filter Data");
    // check if every filterData node has filterValue field and it is filled

    if (isFilterDataNodeIncluded.length > 0) {
      for (const node of isFilterDataNodeIncluded) {
        if (!node.filterValue) {
          throw new Error("Filter Value is Missing for Filter Data Node");
        }
      }
    }
    const workFlow = new WorkFlow({
      userId,
      workFlowSequence,
      workFlowId,
      workFlowEdges,
      workFlowNodes,
    });
    await workFlow.save();
    res.status(200).send("workFlow");
  } catch (error) {
    next(error);
  }
};

/** update workflow */
const updateWorkFlow = async (req, res, next) => {
  try {
    const { userId, workFlowSequence, workFlowId, workFlowEdges, workFlowNodes } = req.body;
    if (!userId || !workFlowSequence) throw new Error("Missing Data");
    const workFlow = await WorkFlow.findOne({ workFlowId });
    if (!workFlow) throw new Error("Workflow not found");
    workFlow.workFlowSequence = workFlowSequence;
    workFlow.workFlowEdges = workFlowEdges;
    workFlow.workFlowNodes = workFlowNodes;
    await workFlow.save();
    res.status(200).send("workFlow");
  } catch (error) {
    next(error);
  }
};
export { createWorkFlow, updateWorkFlow };
