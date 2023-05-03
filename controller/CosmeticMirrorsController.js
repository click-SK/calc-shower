import CosmeticMirrors from '../models/CosmeticMirrors.js';

export const create = async (req, res) => {
    try{
        const { name, typeGlass, size, lightBulbs, patron, processingСutout } = req.body;

        const data = await CosmeticMirrors.create({
            name,
            typeGlass,
            size,
            processingСutout,
            lightBulbs,
            patron
        });

        res.json(data);
    } catch(e) {
        console.log(e);
    }
}

export const getAll = async (req, res) => {
    try {
        const allData = await CosmeticMirrors.find();

        res.json(allData)
    } catch(e) {
        console.log(e);
    }
}