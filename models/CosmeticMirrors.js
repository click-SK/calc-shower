import mongoose from "mongoose";

const CosmeticMirrorsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    typeGlass: [{
      name: String,
      price: Number,
      mirrorsImage: String
    }],
    typeWordpress: [{
      name: String,
      price: Number,
      mirrorsImage: String
    }],
    size: [{
      name: String,
      price: Number,
    }],
    processingСutout: [{
      name: String,
      price: Number,
      count: Number,
  }],
    lightBulbs: Number,
    patron: Number,
  },
  { timestamps: true }
);

export default mongoose.model("CosmeticMirrors", CosmeticMirrorsSchema);