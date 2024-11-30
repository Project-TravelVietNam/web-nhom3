import mongoose from "mongoose";
const reviewSchema = mongoose.Schema(
    {
      username: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
},
    {
        timestamps: true
    });

export default mongoose.model("Post", PostSchema)