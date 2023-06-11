import mongoose from "mongoose";

const MirrorsStandartSchema = new mongoose.Schema(
  {
    type: [
        {
            name: String,
            goods: [
                {
                    name: String,
                    price: Number,
                    mirrorsImage: String
                }
            ]
        }
    ],
    typeWordpress: [
        {
            name: String,
            goods: [
                {
                    name: String,
                    price: Number,
                    mirrorsImage: String
                }
            ]
        }
    ],
    option: {
            frame: [
                {
                    name: String,
                    price: Number,
                }
            ],
            backLight: [
                {
                    name: String,
                    price: Number,
                }
            ],
            switch: [
                {
                    name: String,
                    price: Number,
                }
            ],
            cord: {
                name: String,
                price: Number,
            },
            warmedUp: {
                isWarmed: Boolean,
                price: Number,
            },
            painting: {
                isPainting: Boolean,
                price: Number,
            },
            color: [
                {
                    name: String,
                    price: Number,
                }
            ],
        },
        processingСutout: [{
            name: String,
            price: Number,
            count: Number,
        }],
  },
  { timestamps: true }
);

export default mongoose.model("MirrorsStandart", MirrorsStandartSchema);