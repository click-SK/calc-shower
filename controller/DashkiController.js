import Dashki from '../models/Dashki.js';
export const create = async (req, res) => {
    try{
        const { name, typeGlass, size, color, vanta, depository, furniture, processingStandart, processingСutout } = req.body;

        const data = await Dashki.create({
            name,
            typeGlass,
            size,
            color,
            processingStandart,
            processingСutout,
            vanta,
            depository,
            furniture
        });

        res.json(data);
    } catch(e) {
        console.log(e);
    }
}

export const getAll = async (req, res) => {
    try {
        const allData = await Dashki.find();

        res.json(allData)
    } catch(e) {
        console.log(e);
    }
}