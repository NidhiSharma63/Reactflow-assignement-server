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
  workFlowEdges: [
    {
      id: String,
      source: String,
      sourceHandle: { type: String, default: null },
      target: String,
      targetHandle: { type: String, default: null },
    },
  ],
  workFlowNodes: [
    {
      id: { type: String },
      data: {
        label: { type: String },
      },
      height: { type: Number },
      position: { x: { type: Number }, y: { type: Number } },
      positionAbsolute: { x: { type: Number }, y: { type: Number } },
      type: { type: String },
      width: { type: Number },
    },
  ],
});

// now we need to create collection
const WorkFlow = new mongoose.model("WorkFlow", workFlowSchema);
export default WorkFlow;
