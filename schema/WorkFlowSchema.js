import mongoose from "mongoose";
// creating schema
const workFlowSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  workFlowSequence: [
    {
      type: {
        type: String,
        required: true,
      },
      filterValue: {
        type: String,
        required: false, // Optional field
      },
    },
  ],
  workFlowId: {
    type: String,
    required: true,
  },
});

// now we need to create collection
const WorkFlow = new mongoose.model("WorkFlow", workFlowSchema);
export default WorkFlow;
