import WorkFlow from "../schema/WorkFlowSchema.js";

const createWorkFlow = async (req, res, next) => {
  try {
    const { userId, workFlowSequence, workFlowId } = req.body;
    if (!userId || !workFlowSequence) throw new Error("Missing Data");

    /**
     * check if workFlow sequence includes start and end more than one times
     */
    const isStartIncludeMoreThanOne = workFlowSequence.filter((step) => step === "Start").length > 1;
    const isEndIncludeMoreThanOne = workFlowSequence.filter((step) => step === "End").length > 1;

    if (isStartIncludeMoreThanOne) {
      throw new Error("Start should be included only once");
    }

    if (isEndIncludeMoreThanOne) {
      throw new Error("End should be included only once");
    }

    console.log(workFlowSequence);
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
    });
    // await workFlow.save();
    res.status(200).send("workFlow");
  } catch (error) {
    next(error);
  }
};

export default createWorkFlow;
