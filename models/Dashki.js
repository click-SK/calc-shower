import mongoose from "mongoose";

const DashkiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    typeGlass: [{
      name: String,
      price: Number,
    }],
    color: [{
        name:String,
        price: Number,
    }],
    size: [{
      name: String,
      price: Number,
    }],
    processing: [{
        name: String,
        price: Number,
    }],
    vanta: Number,
    depository: {
        price: Number,
        count: Number
    },
    furniture: [{
      count: Number,
      mainImage: String,
      title: String,
      drawingImg: String,
      depends: [String],
      colorsFurniture:[{
        color: String,
        price: Number
      }]
    }],
  },
  { timestamps: true }
);

export default mongoose.model("Dashki", DashkiSchema);