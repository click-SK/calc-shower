import GlassPartitions from '../models/GlassPartitions.js';

export const create = async (req, res) => {
    try{
        const { name, typeGlass, size, color, processingStandart, processingСutout, typePartitions, furniture } = req.body;

        const data = await GlassPartitions.create({
            name,
            typeGlass,
            size,
            color,
            processingStandart,
            processingСutout,
            typePartitions,
            furniture
        });

        res.json(data);
    } catch(e) {
        console.log(e);
    }
}

export const getAll = async (req, res) => {
    try {
        const allData = await GlassPartitions.find();

        res.json(allData)
    } catch(e) {
        console.log(e);
    }
}