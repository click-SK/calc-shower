import ShowerCabin from "../models/ShowerCabin.js";

export const create = async (req, res) => {
    try{
        const { name, type, glassThickness, color, sizeOfTheShower, furniture } = req.body;

        const data = await ShowerCabin.create({
            name,
            type,
            glassThickness,
            color,
            sizeOfTheShower,
            furniture
        });

        res.json(data);
    } catch(e) {
        console.log(e);
    }
}

export const addFurniture = async (req,res) => {
    try {
      const id = '6448e892b99aea74f728514d';
      const furniture = {
        "count": 1,
        "mainImage": "url",
        "title": "HDL-305",
        "drawingImg": "url",
        "depends": ["Петля душевая","Стекло-Стекло 90°"],
        "colorsFurniture": [
          { "color": "PSS", "price": 14 },
          { "color": "SSS", "price": 14 },
          { "color": "BLACK", "price": 15.5 }
        ]
      };
      const showerCabin = await ShowerCabin.findOneAndUpdate(
        { _id: id },
        { $push: { furniture: furniture } },
        { new: true }
      );
      res.json(showerCabin)
    } catch (error) {
      console.error(error);
    }
  };

  export const changeFurnitureDepends = async (req,res) => {
    try {
        const showerCabinId = '6447e11e3f44cf96d02d75c9';
        const furnitureId = '6447e11e3f44cf96d02d75d1';
        const depends = ["New Depend 1", "New Depend 2"];
    
        const showerCabin = await ShowerCabin.findOneAndUpdate(
          { _id: showerCabinId, "furniture._id": furnitureId },
          { $set: { "furniture.$.depends": depends } },
          { new: true }
        );
    
        res.json(showerCabin);
      } catch (error) {
        console.error(error);
      }
  };

  export const changeFurnitureColors = async (req, res) => {
    console.log('work');
    const {color, price, showerCabinId, furnitureId, currentId} = req.body;
    try {
      const colorsFurniture = {color: color, price: price};
  
      const showerCabin = await ShowerCabin.findOneAndUpdate(
        { _id: showerCabinId, "furniture._id": furnitureId },
        { $set: { "furniture.$[outer].colorsFurniture.$[inner]": colorsFurniture } },
        { new: true, arrayFilters: [{ "outer._id": furnitureId }, { "inner._id": currentId }] }
      );
  
      await res.json(showerCabin);
    } catch (error) {
      console.error(error);
    }
  };

  export const updateShowerCabinColors = async (req, res) => {
    const {showerCabinId, colors} = req.body;
    try {
      // const showerCabinId = '6448e892b99aea74f728514d';
      const showerCabin = await ShowerCabin.findById(showerCabinId);
      showerCabin.color = colors;
      const updatedShowerCabin = await showerCabin.save();
      res.json(updatedShowerCabin)
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update shower cabin colors');
    }
  }

export const getAll = async (req, res) => {
    try {
        const allData = await ShowerCabin.find();

        res.json(allData)
    } catch(e) {
        console.log(e);
    }
}