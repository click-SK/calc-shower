import Dashki from '../models/Dashki.js';
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
        const { name, typeGlass, typeWordpress, size, color, vanta, depository, furniture, processingStandart, processingСutout } = req.body;

        const data = await Dashki.create({
            name,
            typeGlass,
            typeWordpress,
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

export const removeDashkiType = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
  
      const shower = await Dashki.findOneAndUpdate(
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

  export const addNewColor = async (req,res) => {
    const { showerId, name, price } = req.body;
    console.log('WORK!!!');
    try {
      const showerCabin = await Dashki.findOneAndUpdate(
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

  export const updateDashkiType = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await Dashki.findOne(); // знаходимо один екземпляр моделі
      
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

export const updateDashkiSize = async (req,res) => {
    try {
        const {price, name,  typeId} = req.body;
        console.log('price',price);
        console.log('typeId',typeId);
  
        const shower = await Dashki.findOne(); // знаходимо один екземпляр моделі
      
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

  // export const removeDashkiColor = async (req, res) => {
  //   try {
  //     const { showerId, currentId } = req.body;
  //     const shower = await Dashki.findOneAndUpdate(
  //       { _id: showerId },
  //       { $pull: { type: { _id: currentId } } },
  //       { new: true }
  //     );
  
  //     if (!shower) {
  //       return res.status(404).json({ message: 'Shower cabin not found' });
  //     }
  
  //     return res.json(shower);
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(500).json({ message: 'Failed to remove shower furniture' });
  //   }
  // };

  export const removeDashkiColor = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
      const shower = await Dashki.findOneAndUpdate(
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

  // export const removeDashkiType = async (req, res) => {
  //   try {
  //     const { showerId, currentId } = req.body;
  
  //     const shower = await Dashki.findOneAndUpdate(
  //       { _id: showerId },
  //       { $pull: { typeGlass: { _id: currentId } } },
  //       { new: true }
  //     );
  
  //     if (!shower) {
  //       return res.status(404).json({ message: 'Shower cabin not found' });
  //     }
  
  //     return res.json(shower);
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(500).json({ message: 'Failed to remove shower furniture' });
  //   }
  // };

  export const updateDashkiColor = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await Dashki.findOne(); // знаходимо один екземпляр моделі
      
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

//-------------

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
    const showerCabin = await Dashki.findOneAndUpdate(
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

    const showerCabin = await Dashki.findOneAndUpdate(
      { _id: showerCabinId, "furniture._id": furnitureId },
      { $set: { "furniture.$[outer].colorsFurniture.$[inner]": colorsFurniture } },
      { new: true, arrayFilters: [{ "outer._id": furnitureId }, { "inner._id": currentId }] }
    );

    await res.json(showerCabin);
  } catch (error) {
    console.error(error);
  }
};

export const updateDashkiCabinFurnitureDepends = async (req, res) => {
  const {showerCabinId, colors, furnitureId, idx} = req.body;
  console.log('showerCabinId',showerCabinId);
  console.log('furnitureId',furnitureId);
  try {
    const showerCabin = await Dashki.findById(showerCabinId);
    showerCabin.furniture[idx].depends = colors;
    const updatedShowerCabin = await showerCabin.save();
    await res.json(updatedShowerCabin);

  } catch (err) {
    console.error(err);
    throw new Error('Failed to update shower cabin colors');
  }
}

export const updateDashkiCabinFurnitureMainImage = async (req,res) => {
  try {
    const {furnitureId, showerId} = req.body;

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const shower = await Dashki.findOneAndUpdate(
      { _id: showerId, "furniture._id": furnitureId}, // умовний оператор
      { $set: { "furniture.$[outer].mainImage": result.secure_url } },
      { new: true, arrayFilters: [{ "outer._id": furnitureId }] } 
    );

    res.json(shower)

  } catch(e) {
    console.log(e);
  }
}

export const updateDashkiCabinFurnitureSecondImage = async (req,res) => {
  try {
    const {furnitureId, showerId} = req.body;

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const shower = await Dashki.findOneAndUpdate(
      { _id: showerId, "furniture._id": furnitureId}, // умовний оператор
      { $set: { "furniture.$[outer].drawingImg": result.secure_url } },
      { new: true, arrayFilters: [{ "outer._id": furnitureId }] } 
    );

    res.json(shower)

  } catch(e) {
    console.log(e);
  }
}

export const updateDashkiCabinFurnitureTitle = async (req,res) => {
  try {
    const {furnitureId, showerId, title} = req.body;

    const shower = await Dashki.findOneAndUpdate(
      { _id: showerId, "furniture._id": furnitureId}, // умовний оператор
      { $set: { "furniture.$[outer].title": title } },
      { new: true, arrayFilters: [{ "outer._id": furnitureId }] } 
    );
    res.json(shower)

  } catch(e) {
    console.log(e);
  }
}

export const addNewFurnitureColors = async (req,res) => {
  const { showerId, furnitureId, color, price } = req.body;
  try {
    const showerCabin = await Dashki.findOneAndUpdate(
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

    const shower = await Dashki.findByIdAndUpdate(
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

export const removeDashkiFurniture = async (req, res) => {
  try {
    const { showerId, furnitureId } = req.body;

    const shower = await Dashki.findOneAndUpdate(
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

export const updateProcessingStandart = async (req,res) => {
  try {
      const {name, price, typeId} = req.body;

      const shower = await Dashki.findOne(); // знаходимо один екземпляр моделі
    
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

    const shower = await Dashki.findOneAndUpdate(
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

export const addNewType = async (req,res) => {
  const { showerId, name, price } = req.body;
  console.log('WORK!!!');
  try {
    const showerCabin = await Dashki.findOneAndUpdate(
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

export const addNewProcessingStandart = async (req,res) => {
  const { showerId, name, price } = req.body;
  try {
    const showerCabin = await Dashki.findOneAndUpdate(
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

      const shower = await Dashki.findOne(); // знаходимо один екземпляр моделі
    
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

    const shower = await Dashki.findOneAndUpdate(
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
    const showerCabin = await Dashki.findOneAndUpdate(
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

export const createCRM = async (req,res) => {
  const {order} = req.body;
  console.log(order);
  const url = 'https://openapi.keycrm.app/v1/order';
  const correlationId = '3c1cdba9-75bf-4a63-920b-80ff07f142c0';
  const token = 'ODQ0MDA5YjE3ZmJhMGYwNzQxMTFlN2FmYmRlZjE0MzEwNDljYzM5OQ';

  const data = {
    source_id: 10,
    buyer_comment: "I want this sentence to be my buyer comment on KeyCRM",
    discount_percent: 11.5,
    discount_amount: 9.99,
    shipping_price: 2.5,
    wrap_price: 3.5,
    taxes: 2.5,
    buyer: {
      full_name: "Test Kushnir",
      email: "john.doe@mail.app",
      phone: "+380635530117"
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Correlation-Id': correlationId,
        'Accept': 'application/json',
        'Pragma': 'no-cache'
      },
      body: JSON.stringify(order)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export const addNewClientType = async (req,res) => {
  const { showerId, name, price } = req.body;
  console.log('WORK!!!');
  try {
    const showerCabin = await Dashki.findOneAndUpdate(
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

export const removeClientDashkiType = async (req, res) => {
  try {
    const { showerId, currentId } = req.body;

    const shower = await Dashki.findOneAndUpdate(
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

export const updateClientDashkiType = async (req,res) => {
  try {
      const {name, price, typeId} = req.body;

      const shower = await Dashki.findOne(); // знаходимо один екземпляр моделі
    
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
    console.log('parseData dashki',parseData);
    res.json({message: 'success'})
  }catch(e){
    console.log(e);
  }
}