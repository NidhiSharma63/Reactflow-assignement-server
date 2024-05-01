import WorkFlow from "../schema/WorkFlowSchema.js";
const getWorkflowIds = async (req, res, next) => {
  try {
    // get userId from query
    const { userId } = req.query;
    const findWorkFlowIds = await WorkFlow.find({ userId });
    const workFlowIds = findWorkFlowIds.map((workflow) => workflow.workFlowId);
    // send response
    res.send(workFlowIds);
  } catch (error) {
    next(error);
  }
};

export default getWorkflowIds;
