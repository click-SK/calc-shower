import MirrorsStandart from "../models/MirrorsStandart.js";

export const create = async (req, res) => {
    try{
        const { type, option, processingСutout} = req.body;

        console.log('type',type);
        console.log('option',option);

        const data = await MirrorsStandart.create({
            type,
            option,
            processingСutout
        });

        res.json(data);
    } catch(e) {
        console.log(e);
    }
}


export const getAll = async (req, res) => {
    try {
        const allData = await MirrorsStandart.find();

        res.json(allData)
    } catch(e) {
        console.log(e);
    }
}

export const updateGoods = async (req, res) => {
    const {typeIndex, goodsIndex, name, price} = req.body;
    try {
        console.log('typeIndex',typeIndex);
        console.log('goodsIndex',goodsIndex);
        console.log('name',name);
        console.log('price',price);
        const mirror = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
    
        // оновлюємо об'єкт goods відповідного типу
        mirror.type[typeIndex].goods[goodsIndex] = {
            name: name,
            price: price,
            };
    
        // зберігаємо зміни у базі даних
        const updatedMirror = await mirror.save();
        console.log(updatedMirror);
      } catch (error) {
        console.error(error);
      }
}

export const updateType = async (req, res) => {
    const {typeIndex, name, goods} = req.body;
    try {
        console.log('typeIndex',typeIndex);
        console.log('name',name);
        const mirror = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
    
        // оновлюємо об'єкт goods відповідного типу
        mirror.type[typeIndex] = {
            name: name,
            goods: goods,
            };
    
        // зберігаємо зміни у базі даних
        const updatedMirror = await mirror.save();
        console.log(updatedMirror);
      } catch (error) {
        console.error(error);
      }
}