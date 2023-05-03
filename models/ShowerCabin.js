import mongoose from "mongoose";

const ShowerCabinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    type: [
      {
        name: String,
        price: Number,
      },
    ],
    typeWordpress: [
      {
        name: String,
        price: Number,
      },
    ],
    glassThickness: [
      {
        name: String,
        price: Number,
      },
    ],
    color: [String],
    sizeOfTheShower: [
      {
        name: String,
        price: Number,
      },
    ],
    dorsHandles: [
      {
        name: String,
        price: Number,
      },
    ],
    processingStandart: [
      {
        name: String,
        price: Number,
      },
    ],
    processingСutout: [
      {
        name: String,
        price: Number,
        count: Number,
      },
    ],
    furniture: [
      {
        count: Number,
        mainImage: String,
        title: String,
        drawingImg: String,
        depends: [String],
        colorsFurniture: [
          {
            color: String,
            price: Number,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("ShowerCabin", ShowerCabinSchema);
