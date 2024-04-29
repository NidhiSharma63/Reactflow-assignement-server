import WorkFlow from "../schema/WorkFlowSchema.js";

const createWorkFlow = async (req, res, next) => {
  try {
    const { userId, workFlowSequence, workFlowId } = req.body;
    if (!userId || !workFlowSequence) throw new Error("Missing Data");
    const workFlow = new WorkFlow({
      userId,
      workFlowSequence,
      workFlowId,
    });
    await workFlow.save();
    res.status(200).send(workFlow);
  } catch (error) {
    next(error);
  }
};

export default createWorkFlow;
