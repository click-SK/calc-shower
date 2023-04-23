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


export const getAll = async (req, res) => {
    try {
        const allData = await ShowerCabin.find();

        res.json(allData)
    } catch(e) {
        console.log(e);
    }
}