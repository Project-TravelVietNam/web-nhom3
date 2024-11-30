import mongoose from "mongoose";

const culturalSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    region: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
    },
    imgculural: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    address: {
      type: String,
    }
  },
  { timestamps: true }
);

const Cultural = mongoose.model("Cultural", culturalSchema);

export default Cultural;
