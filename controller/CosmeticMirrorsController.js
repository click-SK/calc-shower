import CosmeticMirrors from '../models/CosmeticMirrors.js';
import multer from 'multer';
import cloudinary from 'cloudinary';
import fs from 'fs';
import { SendMessageToBot } from "../services/SendMessageToBot.js";

// конфігуруємо Cloudinary
cloudinary.config({
  cloud_name: 'dzroxyus8',
  api_key: '235818666177812',
  api_secret: '8-Mw7cej-V9GD1d8oPZ8d3djEgo'
});

const storage = multer.diskStorage({
destination: (_, __, cb) => {
  if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
  }
  cb(null, 'uploads');
},
filename: (_, file, cb) => {
  cb(null, file.originalname);
},
});

export const upload = multer({ storage });

export const create = async (req, res) => {
    try{
        const { name, typeGlass, typeWordpress, size, lightBulbs, patron, processingСutout } = req.body;

        const data = await CosmeticMirrors.create({
            name,
            typeGlass,
            typeWordpress,
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

export const updateProcessingСutout = async (req,res) => {
    try {
        const {name, price, count, typeId} = req.body;
  
        const shower = await CosmeticMirrors.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.processingСutout.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.processingСutout[index] = {
            name: name,
            price: price,
            count: count
        };
  
        // зберігаємо зміни у базі даних
        const updatedType = await shower.save();
  
        res.json(updatedType)
  
    } catch (e) {
        console.log(e);
    }
  }
  
  export const removeProcessingСutout = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
  
      const shower = await CosmeticMirrors.findOneAndUpdate(
        { _id: showerId },
        { $pull: { processingСutout: { _id: currentId } } },
        { new: true }
      );
  
      if (!shower) {
        return res.status(404).json({ message: 'Shower cabin not found' });
      }
  
      return res.json(shower);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Failed to remove shower furniture' });
    }
  };
  
  export const addNewProcessingСutout = async (req,res) => {
    const { showerId, name, count, price } = req.body;
    console.log('WORK!!!');
    try {
      const showerCabin = await CosmeticMirrors.findOneAndUpdate(
        { _id: showerId },
        { $push: { processingСutout: { name: name, price: price, count: count } } },
        { new: true }
      );
  
      await res.json(showerCabin);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to add color to furniture');
    }
  }

  export const removeType = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
  
      const shower = await CosmeticMirrors.findOneAndUpdate(
        { _id: showerId },
        { $pull: { typeGlass: { _id: currentId } } },
        { new: true }
      );
  
      if (!shower) {
        return res.status(404).json({ message: 'Shower cabin not found' });
      }
  
      return res.json(shower);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Failed to remove shower furniture' });
    }
  };

  export const updateType = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await CosmeticMirrors.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.typeGlass.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.typeGlass[index] = {
            name: name,
            price: price,
        };
  
        // зберігаємо зміни у базі даних
        const updatedType = await shower.save();
  
        res.json(updatedType)
  
    } catch (e) {
        console.log(e);
    }
}

export const addNewType = async (req,res) => {
    const { showerId, name, price } = req.body;
    console.log('WORK!!!');
    try {
      const showerCabin = await CosmeticMirrors.findOneAndUpdate(
        { _id: showerId },
        { $push: { typeGlass: { name: name, price: price } } },
        { new: true }
      );
  
      await res.json(showerCabin);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to add color to furniture');
    }
  }

  export const updateSize = async (req,res) => {
    try {
        const {price, name,  typeId} = req.body;
        console.log('price',price);
        console.log('typeId',typeId);
  
        const shower = await CosmeticMirrors.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.size.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.size[index] = {
            price,
            name
        };
  
        // зберігаємо зміни у базі даних
        const updatedType = await shower.save();
  
        res.json(updatedType)
  
    } catch (e) {
        console.log(e);
    }
  }

  export const updateLightBulbs = async (req,res) => {
    try {
        const {showerId, lightBulbs} = req.body;
  
        const shower = await CosmeticMirrors.findOne(); // знаходимо один екземпляр моделі
        
        // оновлюємо об'єкт goods відповідного типу
        shower.lightBulbs = lightBulbs;
  
        // зберігаємо зміни у базі даних
        const updatedType = await shower.save();
  
        res.json(updatedType)
  
    } catch (e) {
        console.log(e);
    }
  }

  
  export const updatePatron = async (req,res) => {
    try {
        const {patron} = req.body;
  
        const shower = await CosmeticMirrors.findOne(); // знаходимо один екземпляр моделі
        
        // оновлюємо об'єкт goods відповідного типу
        shower.patron = patron;
  
        // зберігаємо зміни у базі даних
        const updatedType = await shower.save();
  
        res.json(updatedType)
  
    } catch (e) {
        console.log(e);
    }
  }

  export const removeClientType = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
  
      const shower = await CosmeticMirrors.findOneAndUpdate(
        { _id: showerId },
        { $pull: { typeWordpress: { _id: currentId } } },
        { new: true }
      );
  
      if (!shower) {
        return res.status(404).json({ message: 'Shower cabin not found' });
      }
  
      return res.json(shower);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Failed to remove shower furniture' });
    }
  };

  export const updateClientType = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await CosmeticMirrors.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.typeWordpress.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.typeWordpress[index] = {
            name: name,
            price: price,
        };
  
        // зберігаємо зміни у базі даних
        const updatedType = await shower.save();
  
        res.json(updatedType)
  
    } catch (e) {
        console.log(e);
    }
}

export const addNewClientType = async (req,res) => {
    const { showerId, name, price } = req.body;
    console.log('WORK!!!');
    try {
      const showerCabin = await CosmeticMirrors.findOneAndUpdate(
        { _id: showerId },
        { $push: { typeWordpress: { name: name, price: price } } },
        { new: true }
      );
  
      await res.json(showerCabin);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to add color to furniture');
    }
  }

  export const updateClientTypeImage = async (req,res) => {
    try {
      const {typeId, showerId} = req.body;

      if (!req.file) {
        return res.json({ message: 'No photo chosen' });
      }
  
      const result = await cloudinary.v2.uploader.upload(req.file.path);
  
      const shower = await CosmeticMirrors.findOneAndUpdate(
        { _id: showerId, "typeWordpress._id": typeId}, // умовний оператор
        { $set: { "typeWordpress.$[outer].mirrorsImage": result.secure_url } },
        { new: true, arrayFilters: [{ "outer._id": typeId }] } 
      );
  
      res.json(shower)
  
    } catch(e) {
      console.log(e);
    }
  }

  export const updateTypeImage = async (req,res) => {
    try {
      const {typeId, showerId} = req.body;
  
      if (!req.file) {
        return res.json({ message: 'No photo chosen' });
      }
  
      const result = await cloudinary.v2.uploader.upload(req.file.path);
  
      const shower = await CosmeticMirrors.findOneAndUpdate(
        { _id: showerId, "typeGlass._id": typeId}, // умовний оператор
        { $set: { "typeGlass.$[outer].mirrorsImage": result.secure_url } },
        { new: true, arrayFilters: [{ "outer._id": typeId }] } 
      );
  
      res.json(shower)
  
    } catch(e) {
      console.log(e);
    }
  }

  export const gettingOrderAndSendToTelegramm = async (req,res) => {
    try {
      const {data} = req.body;
      console.log('date',data.order);
      const product = data.order.products[0];
      console.log('product',product);
      const templateMessageText = `
      👨‍💼<strong>Клієнт</strong>
      
      Назва товару: ${product.name}
      Кількість: ${product.quantity}
      Ціна: ${product.price}
  
      📝<strong>Інформація про замовника:</strong>
      
      Замовник: ${data.order.buyer.full_name}
      Телефон: ${data.order.buyer.phone}
      Адресса: ${data.order.shipping.shipping_address_city}
      Коментар: ${data.order.buyer_comment}
      `
      SendMessageToBot(templateMessageText)
      res.json({message: 'success'})
    }catch(e){
      console.log(e);
    }
  }

  export const managerGettingOrderAndSendToTelegramm = async (req,res) => {
    try {
      const {data} = req.body;
      const parseData = JSON.stringify(data, null, 2);
      console.log('parseData cosmetic mirrors',parseData);
      res.json({message: 'success'})
    }catch(e){
      console.log(e);
    }
  }