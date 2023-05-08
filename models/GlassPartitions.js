import mongoose from "mongoose";

const GlassPartitionsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    typeGlass: [{
      name: String,
      price: Number,
    }],
    typeWordpress: [{
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
    processingStandart: [{
        name: String,
        price: Number,
    }],
    processingСutout: [{
      name: String,
      price: Number,
      count: Number,
  }],
    typePartitions: [{
        name: String,
        price: Number,
        type:String,
    }],
    furniture: [{
      count: Number,
      mainImage: String,
      title: String,
      drawingImg: String,
      partitionsType: String,
      depends: [String],
      colorsFurniture:[{
        color: String,
        price: Number
      }]
    }],
  },
  { timestamps: true }
);

export default mongoose.model("GlassPartitions", GlassPartitionsSchema);