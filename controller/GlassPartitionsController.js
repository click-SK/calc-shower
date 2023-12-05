import GlassPartitions from '../models/GlassPartitions.js';
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
        const { name, typeGlass, typeWordpress, size, color, processingStandart, processingСutout, typePartitions, furniture } = req.body;

        const data = await GlassPartitions.create({
            name,
            typeGlass,
            typeWordpress,
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

export const updateProcessingStandart = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await GlassPartitions.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.processingStandart.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.processingStandart[index] = {
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
  
  export const removeProcessingStandart = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
  
      const shower = await GlassPartitions.findOneAndUpdate(
        { _id: showerId },
        { $pull: { processingStandart: { _id: currentId } } },
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
  
  export const addNewProcessingStandart = async (req,res) => {
    const { showerId, name, price } = req.body;
    console.log('WORK!!!');
    console.log('name',name);
    console.log('price',price);
    try {
      const showerCabin = await GlassPartitions.findOneAndUpdate(
        { _id: showerId },
        { $push: { processingStandart: { name: name, price: price } } },
        { new: true }
      );
  
      await res.json(showerCabin);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to add color to furniture');
    }
  }
  
  export const updateProcessingСutout = async (req,res) => {
    try {
        const {name, price, count, typeId} = req.body;
  
        const shower = await GlassPartitions.findOne(); // знаходимо один екземпляр моделі
      
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
  
      const shower = await GlassPartitions.findOneAndUpdate(
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
      const showerCabin = await GlassPartitions.findOneAndUpdate(
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

  export const removeColor = async (req, res) => {
    console.log('work!!');
    try {
      const { showerId, currentId } = req.body;
  
      const shower = await GlassPartitions.findOneAndUpdate(
        { _id: showerId },
        { $pull: { color: { _id: currentId } } },
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

  export const updateColor = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await GlassPartitions.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.color.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.color[index] = {
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

export const addNewColor = async (req,res) => {
    const { showerId, name, price } = req.body;
    console.log('WORK!!!');
    try {
      const showerCabin = await GlassPartitions.findOneAndUpdate(
        { _id: showerId },
        { $push: { "color": { name: name, price: price } } },
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
  
        const shower = await GlassPartitions.findOne(); // знаходимо один екземпляр моделі
      
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

  export const removeType = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
  
      const shower = await GlassPartitions.findOneAndUpdate(
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
  
        const shower = await GlassPartitions.findOne(); // знаходимо один екземпляр моделі
      
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
      const showerCabin = await GlassPartitions.findOneAndUpdate(
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

  export const updateTypePartitionsColors = async (req, res) => {
    const {showerCabinId, colors} = req.body;
    try {
      // const showerCabinId = '6448e892b99aea74f728514d';
      const showerCabin = await GlassPartitions.findById(showerCabinId);
      showerCabin.typePartitions = colors;
      const updatedShowerCabin = await showerCabin.save();
      res.json(updatedShowerCabin)
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update shower cabin colors');
    }
  }

  export const addFurniture = async (req,res) => {
    try {
      const {showerId} = req.body;
      const furniture = {
        "count": 1,
        "mainImage": "url",
        "title": "Назва",
        "drawingImg": "url",
        "depends": [],
        "colorsFurniture": [
        ]
      };
      const showerCabin = await GlassPartitions.findOneAndUpdate(
        { _id: showerId },
        { $push: { furniture: furniture } },
        { new: true }
      );
      res.json(showerCabin)
    } catch (error) {
      console.error(error);
    }
  };
  
  export const changeFurnitureColors = async (req, res) => {
    const {color, price, showerCabinId, furnitureId, currentId} = req.body;
    try {
      const colorsFurniture = {color: color, price: price};
  
      const showerCabin = await GlassPartitions.findOneAndUpdate(
        { _id: showerCabinId, "furniture._id": furnitureId },
        { $set: { "furniture.$[outer].colorsFurniture.$[inner]": colorsFurniture } },
        { new: true, arrayFilters: [{ "outer._id": furnitureId }, { "inner._id": currentId }] }
      );
  
      await res.json(showerCabin);
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateFurnitureDepends = async (req, res) => {
    const {showerCabinId, colors, furnitureId, idx} = req.body;
    console.log('showerCabinId',showerCabinId);
    console.log('furnitureId',furnitureId);
    try {
      const showerCabin = await GlassPartitions.findById(showerCabinId);
      showerCabin.furniture[idx].depends = colors;
      const updatedShowerCabin = await showerCabin.save();
      await res.json(updatedShowerCabin);
  
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update shower cabin colors');
    }
  }
  
  export const updateFurnitureMainImage = async (req,res) => {
    try {
      const {furnitureId, showerId} = req.body;
  
      const result = await cloudinary.v2.uploader.upload(req.file.path);
  
      const shower = await GlassPartitions.findOneAndUpdate(
        { _id: showerId, "furniture._id": furnitureId}, // умовний оператор
        { $set: { "furniture.$[outer].mainImage": result.secure_url } },
        { new: true, arrayFilters: [{ "outer._id": furnitureId }] } 
      );
  
      res.json(shower)
  
    } catch(e) {
      console.log(e);
    }
  }
  
  export const updateFurnitureSecondImage = async (req,res) => {
    try {
      const {furnitureId, showerId} = req.body;
  
      const result = await cloudinary.v2.uploader.upload(req.file.path);
  
      const shower = await GlassPartitions.findOneAndUpdate(
        { _id: showerId, "furniture._id": furnitureId}, // умовний оператор
        { $set: { "furniture.$[outer].drawingImg": result.secure_url } },
        { new: true, arrayFilters: [{ "outer._id": furnitureId }] } 
      );
  
      res.json(shower)
  
    } catch(e) {
      console.log(e);
    }
  }
  
  export const updateFurnitureTitle = async (req, res) => {
    try {
      const { furnitureId, showerId, title, partitionsType } = req.body;
  
      const shower = await GlassPartitions.findOneAndUpdate(
        { _id: showerId, "furniture._id": furnitureId },
        {
          $set: {
            "furniture.$[outer].title": title,
            "furniture.$[outer].partitionsType": partitionsType,
          },
        },
        {
          new: true,
          arrayFilters: [{ "outer._id": furnitureId }],
        }
      );
      res.json(shower);
    } catch (e) {
      console.log(e);
    }
  };
  
  export const addNewFurnitureColors = async (req,res) => {
    const { showerId, furnitureId, color, price } = req.body;
    try {
      const showerCabin = await GlassPartitions.findOneAndUpdate(
        { _id: showerId, "furniture._id": furnitureId },
        { $push: { "furniture.$.colorsFurniture": { color: color, price: price } } },
        { new: true }
      );
  
      await res.json(showerCabin);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to add color to furniture');
    }
  }
  
  export const removeFurnitureColors = async (req, res) => {
    try {
      const { showerId, furnitureId, currentId } = req.body;
  
      const shower = await GlassPartitions.findByIdAndUpdate(
        showerId,
        {
          $pull: { 
            "furniture.$[furniture].colorsFurniture": { _id: currentId } 
          }
        },
        {
          new: true,
          arrayFilters: [
            { "furniture._id": furnitureId }
          ]
        }
      );
  
      res.json(shower);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Failed to remove color from furniture" });
    }
  }
  
  export const removeFurniture = async (req, res) => {
    try {
      const { showerId, furnitureId } = req.body;
  
      const shower = await GlassPartitions.findOneAndUpdate(
        { _id: showerId },
        { $pull: { furniture: { _id: furnitureId } } },
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

  export const removeClientType = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
  
      const shower = await GlassPartitions.findOneAndUpdate(
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
  
        const shower = await GlassPartitions.findOne(); // знаходимо один екземпляр моделі
      
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
      const showerCabin = await GlassPartitions.findOneAndUpdate(
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
      console.log('parseData glass partitions',parseData);
      res.json({message: 'success'})
    }catch(e){
      console.log(e);
    }
  }