import MirrorsStandart from "../models/MirrorsStandart.js";
import cloudinary from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import { SendMessageToBot } from "../services/SendMessageToBot.js";

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
        const { type, typeWordpress, option, processingСutout} = req.body;

        console.log('type',type);
        console.log('option',option);

        const data = await MirrorsStandart.create({
            type,
            typeWordpress,
            option,
            processingСutout,
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

export const addNewGoods = async (req, res) =>  {
    try {
        const { typeName, name, price } = req.body;
        console.log('typeName', typeName);
        console.log('name', name);
        console.log('price', price);
        const mirror = await MirrorsStandart.findOne({ 'type.name': typeName });
        if (!mirror) {
          throw new Error(`Mirror with type name '${showerId}' not found.`);
        }
        mirror.type.forEach((type) => {
          if (type.name === typeName) {
            type.goods.push({
              name: name,
              price: price,
            });
          }
        });
        await mirror.save();
        console.log(`New good '${name}' added to type '${showerId}' successfully.`);
      } catch (err) {
        console.error(`Error adding new good to type: ${err.message}`);
      }
  }

export const removeGoods = async (req, res) => {
    try {
        const { typeName, name } = req.body;

        const mirror = await MirrorsStandart.findOne({ 'type.name': typeName });

        const typeIndex = mirror.type.findIndex((type) => type.name === typeName);

        const goodsIndex = mirror.type[typeIndex].goods.findIndex((good) => good.name === name);

        mirror.type[typeIndex].goods.splice(goodsIndex, 1);
        await mirror.save();
      } catch (err) {
        console.error(`Error deleting good from type: ${err.message}`);
      }
  };

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

export const removeFrame = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
      console.log('showerId',showerId);
      console.log('currentId',currentId);
  
      const shower = await MirrorsStandart.findOneAndUpdate(
        { _id: showerId },
        { $pull: { "option.frame": { _id: currentId } } },
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

export const addNewFrame = async (req, res) => {
    const { showerId, name, price } = req.body;
  
    if (!showerId || !name || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        {
          $push: {
            "option.frame": {
              name,
              price
            }
          }
        },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add new frame" });
    }
  };

  export const updateFrame = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.option.frame.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.option.frame[index] = {
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

export const removeBackLight = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
      console.log('showerId',showerId);
      console.log('currentId',currentId);
  
      const shower = await MirrorsStandart.findOneAndUpdate(
        { _id: showerId },
        { $pull: { "option.backLight": { _id: currentId } } },
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

export const addNewBackLight = async (req, res) => {
    const { showerId, name, price } = req.body;
  
    if (!showerId || !name || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        {
          $push: {
            "option.backLight": {
              name,
              price
            }
          }
        },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add new frame" });
    }
  };

  export const updateBackLight = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.option.backLight.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.option.backLight[index] = {
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

export const removeSwitch = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
      console.log('showerId',showerId);
      console.log('currentId',currentId);
  
      const shower = await MirrorsStandart.findOneAndUpdate(
        { _id: showerId },
        { $pull: { "option.switch": { _id: currentId } } },
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

export const addNewSwitch = async (req, res) => {
    const { showerId, name, price } = req.body;
  
    if (!showerId || !name || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        {
          $push: {
            "option.switch": {
              name,
              price
            }
          }
        },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add new frame" });
    }
  };

  export const updateSwitch = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.option.switch.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.option.switch[index] = {
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

export const removeColor = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
      console.log('showerId',showerId);
      console.log('currentId',currentId);
  
      const shower = await MirrorsStandart.findOneAndUpdate(
        { _id: showerId },
        { $pull: { "option.color": { _id: currentId } } },
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

export const addNewColor = async (req, res) => {
    const { showerId, name, price } = req.body;
  
    if (!showerId || !name || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        {
          $push: {
            "option.color": {
              name,
              price
            }
          }
        },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add new frame" });
    }
  };

  export const updateColor = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.option.color.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.option.color[index] = {
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

export const updateCordPrice = async (req, res) => {
    const { showerId, price } = req.body;
  
    if (!showerId || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        { "option.cord.price": price },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update cord price" });
    }
  };

  export const updateWarmedUp = async (req, res) => {
    const { showerId, price } = req.body;
  
    if (!showerId || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        { "option.warmedUp.price": price },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update cord price" });
    }
  };

  export const updatePainting = async (req, res) => {
    const { showerId, price } = req.body;

    console.log('Work!!!');
  
    if (!showerId || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        { "option.painting.price": price },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update cord price" });
    }
  };

  export const updateClientGoods = async (req, res) => {
    const {typeIndex, goodsIndex, name, price} = req.body;
    try {
        console.log('typeIndex',typeIndex);
        console.log('goodsIndex',goodsIndex);
        console.log('name',name);
        console.log('price',price);
        const mirror = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
    
        // оновлюємо об'єкт goods відповідного типу
        mirror.typeWordpress[typeIndex].goods[goodsIndex] = {
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

export const addNewClientGoods = async (req, res) =>  {
    try {
        const { typeName, name, price } = req.body;
        console.log('typeName', typeName);
        console.log('name', name);
        console.log('price', price);
        const mirror = await MirrorsStandart.findOne({ 'type.name': typeName });
        if (!mirror) {
          throw new Error(`Mirror with type name '${showerId}' not found.`);
        }
        mirror.typeWordpress.forEach((type) => {
          if (type.name === typeName) {
            type.goods.push({
              name: name,
              price: price,
            });
          }
        });
        await mirror.save();
        console.log(`New good '${name}' added to type '${showerId}' successfully.`);
      } catch (err) {
        console.error(`Error adding new good to type: ${err.message}`);
      }
  }

export const removeClientGoods = async (req, res) => {
    try {
        const { typeName, name } = req.body;

        const mirror = await MirrorsStandart.findOne({ 'type.name': typeName });

        const typeIndex = mirror.typeWordpress.findIndex((type) => type.name === typeName);

        const goodsIndex = mirror.typeWordpress[typeIndex].goods.findIndex((good) => good.name === name);

        mirror.typeWordpress[typeIndex].goods.splice(goodsIndex, 1);
        await mirror.save();
      } catch (err) {
        console.error(`Error deleting good from type: ${err.message}`);
      }
  };

export const updateClientType = async (req, res) => {
    const {typeIndex, name, goods} = req.body;
    try {
        console.log('typeIndex',typeIndex);
        console.log('name',name);
        const mirror = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
    
        // оновлюємо об'єкт goods відповідного типу
        mirror.typeWordpress[typeIndex] = {
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

export const updateProcessingСutout = async (req,res) => {
  try {
      const {name, price, count, typeId} = req.body;

      const shower = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
    
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

    const shower = await MirrorsStandart.findOneAndUpdate(
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
    const showerCabin = await MirrorsStandart.findOneAndUpdate(
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

export const updateStandartMirrorGoodsImage = async (req, res) => {
  try {
    const { typeIdx, goodsIdx, name, price } = req.body;

    if (!req.file) {
      return res.json({ message: 'No photo chosen' });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const mirror = await MirrorsStandart.findOne();

    mirror.type[typeIdx].goods[goodsIdx] = {
      mirrorsImage: result.secure_url,
      name,
      price
    };

    // зберігаємо зміни у базі даних
    const updatedMirror = await mirror.save();
    res.json(updatedMirror)
  } catch (e) {
    console.log(e);
  }
};

export const updateClientStandartMirrorGoodsImage = async (req, res) => {
  try {
    const { typeIdx, goodsIdx, name, price } = req.body;

    if (!req.file) {
      return res.json({ message: 'No photo chosen' });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const mirror = await MirrorsStandart.findOne();

    mirror.typeWordpress[typeIdx].goods[goodsIdx] = {
      mirrorsImage: result.secure_url,
      name,
      price
    };

    // зберігаємо зміни у базі даних
    const updatedMirror = await mirror.save();
    res.json(updatedMirror)
  } catch (e) {
    console.log(e);
  }
};

export const gettingOrderAndSendToTelegramm = async (req,res) => {
  try {
    const {data} = req.body;

    const product = data.order.products[0];
    const properties = product.properties;

    let propertiesText = '';

    properties.forEach((item) => {
      propertiesText += `${item.name}, `;
    });
    
    propertiesText = propertiesText.slice(0, -2);

    const templateMessageText = `
    👨‍💼<strong>Клієнт</strong>
    
    Назва товару: ${product.name}
    Кількість: ${product.quantity}
    Додатково: ${propertiesText}
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
    console.log('parseData mirrors standart',parseData);
    res.json({message: 'success'})
  }catch(e){
    console.log(e);
  }
}