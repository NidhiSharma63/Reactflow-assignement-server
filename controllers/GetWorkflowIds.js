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

const getWorkFlowDetails = async (req, res, next) => {
  try {
    const { workFlowId } = req.query;
    const workFlowDetails = await WorkFlow.findOne({ workFlowId });
    // console.log({ workFlowDetails, workFlowId });
    res.send(workFlowDetails);
  } catch (error) {
    next(error);
  }
};

export { getWorkFlowDetails, getWorkflowIds };
