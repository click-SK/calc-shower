import ShowerCabin from "../models/ShowerCabin.js";
import multer from 'multer';
import cloudinary from 'cloudinary';
import fs from 'fs';

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
        const { name, type, glassThickness, color, sizeOfTheShower, furniture, typeWordpress, dorsHandles, processingStandart, processingСutout } = req.body;
        console.log('name',name);
        console.log('type',type);
        console.log('glassThickness',glassThickness);
        console.log('color',color);
        console.log('sizeOfTheShower',sizeOfTheShower);
        console.log('furniture',furniture);
        console.log('typeWordpress',typeWordpress);
        console.log('dorsHandles',dorsHandles);
        console.log('processingStandart',processingStandart);
        console.log('processingСutout',processingСutout);
        const data = await ShowerCabin.create({
            name,
            type,
            glassThickness,
            color,
            sizeOfTheShower,
            furniture,
            typeWordpress,
            dorsHandles,
            processingStandart,
            processingСutout
        });

        res.json(data);
    } catch(e) {
        console.log(e);
    }
}

export const addFurniture = async (req,res) => {
    try {
      console.log('WORK!');
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
      const showerCabin = await ShowerCabin.findOneAndUpdate(
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
    console.log('Work!');
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
  

  export const updateGlassThickness = async (id, glassThickness) => {
    try {
      const updatedShowerCabin = await ShowerCabin.findOneAndUpdate(
        { _id: id }, // умовний оператор
        { $set: { glassThickness: glassThickness } }, // зміна поля glassThickness
        { new: true } // параметр, який поверне оновлену модель
      );
      return updatedShowerCabin;
    } catch (error) {
      console.error(error);
    }
  };

export const updateShowerCabinType = async (req,res) => {
  console.log('WORK Update');
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await ShowerCabin.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.type.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.type[index] = {
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

export const removeShowerType = async (req, res) => {
  console.log('WORK Remove');
  try {
    const { showerId, currentId } = req.body;

    const shower = await ShowerCabin.findOneAndUpdate(
      { _id: showerId },
      { $pull: { type: { _id: currentId } } },
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

export const updateShowerCabinColor = async (req,res) => {
  try {
      const {name, price, typeId} = req.body;
      console.log('name',name);
      console.log('price',price);
      console.log('typeId',typeId);

      const shower = await ShowerCabin.findOne(); // знаходимо один екземпляр моделі
    
      // знаходимо індекс елемента в масиві type
      const index = shower.glassThickness.findIndex(item => item._id.toString() === typeId);
      
      // оновлюємо об'єкт goods відповідного типу
      shower.glassThickness[index] = {
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

export const updateShowerCabinSize = async (req,res) => {
  try {
      const {price, name, typeId} = req.body;
      console.log('price',price);
      console.log('typeId',typeId);

      const shower = await ShowerCabin.findOne(); // знаходимо один екземпляр моделі
    
      // знаходимо індекс елемента в масиві type
      const index = shower.sizeOfTheShower.findIndex(item => item._id.toString() === typeId);
      
      // оновлюємо об'єкт goods відповідного типу
      shower.sizeOfTheShower[index] = {
          price: price,
          name: name,
      };

      // зберігаємо зміни у базі даних
      const updatedType = await shower.save();

      res.json(updatedType)

  } catch (e) {
      console.log(e);
  }
}

export const updateShowerCabinFurnitureDepends = async (req, res) => {
  const {showerCabinId, colors, furnitureId, idx} = req.body;
  console.log('showerCabinId',showerCabinId);
  console.log('furnitureId',furnitureId);
  try {
    const showerCabin = await ShowerCabin.findById(showerCabinId);
    showerCabin.furniture[idx].depends = colors;
    const updatedShowerCabin = await showerCabin.save();
    await res.json(updatedShowerCabin);

  } catch (err) {
    console.error(err);
    throw new Error('Failed to update shower cabin colors');
  }
}

export const updateShowerCabinFurnitureMainImage = async (req,res) => {
  try {
    const {furnitureId, showerId} = req.body;

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const shower = await ShowerCabin.findOneAndUpdate(
      { _id: showerId, "furniture._id": furnitureId}, // умовний оператор
      { $set: { "furniture.$[outer].mainImage": result.secure_url } },
      { new: true, arrayFilters: [{ "outer._id": furnitureId }] } 
    );

    res.json(shower)

  } catch(e) {
    console.log(e);
  }
}

export const updateShowerCabinFurnitureSecondImage = async (req,res) => {
  try {
    const {furnitureId, showerId} = req.body;

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const shower = await ShowerCabin.findOneAndUpdate(
      { _id: showerId, "furniture._id": furnitureId}, // умовний оператор
      { $set: { "furniture.$[outer].drawingImg": result.secure_url } },
      { new: true, arrayFilters: [{ "outer._id": furnitureId }] } 
    );

    res.json(shower)

  } catch(e) {
    console.log(e);
  }
}

export const updateShowerCabinFurnitureTitle = async (req,res) => {
  try {
    const {furnitureId, showerId, title} = req.body;

    const shower = await ShowerCabin.findOneAndUpdate(
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
    const showerCabin = await ShowerCabin.findOneAndUpdate(
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

    const shower = await ShowerCabin.findByIdAndUpdate(
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

export const removeShowerFurniture = async (req, res) => {
  try {
    const { showerId, furnitureId } = req.body;

    const shower = await ShowerCabin.findOneAndUpdate(
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

export const addNewGlassThickness = async (req,res) => {
  const { showerId, name, price } = req.body;
  console.log('WORK!!!');
  try {
    const showerCabin = await ShowerCabin.findOneAndUpdate(
      { _id: showerId },
      { $push: { "glassThickness": { name: name, price: price } } },
      { new: true }
    );

    await res.json(showerCabin);
  } catch (err) {
    console.error(err);
    throw new Error('Failed to add color to furniture');
  }
}

export const removeShowerGlassThickness = async (req, res) => {
  try {
    const { showerId, currentId } = req.body;

    const shower = await ShowerCabin.findOneAndUpdate(
      { _id: showerId },
      { $pull: { glassThickness: { _id: currentId } } },
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
    const showerCabin = await ShowerCabin.findOneAndUpdate(
      { _id: showerId },
      { $push: { "type": { name: name, price: price, defaultFurniture: [], showerImage: '' } } },
      { new: true }
    );

    await res.json(showerCabin);
  } catch (err) {
    console.error(err);
    throw new Error('Failed to add color to furniture');
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

export const addNewClientType = async (req,res) => {
  const { showerId, name, price } = req.body;
  console.log('WORK!!!');
  try {
    const showerCabin = await ShowerCabin.findOneAndUpdate(
      { _id: showerId },
      { $push: { "typeWordpress": { name: name, price: price } } },
      { new: true }
    );

    await res.json(showerCabin);
  } catch (err) {
    console.error(err);
    throw new Error('Failed to add color to furniture');
  }
}

export const removeShowerClientType = async (req, res) => {
  try {
    const { showerId, currentId } = req.body;

    const shower = await ShowerCabin.findOneAndUpdate(
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

export const updateShowerClientType = async (req,res) => {
  try {
      const {name, price, typeId} = req.body;

      const shower = await ShowerCabin.findOne(); // знаходимо один екземпляр моделі
    
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

export const addNewHandleDors = async (req,res) => {
  const { showerId, name, price } = req.body;
  console.log('WORK!!!');
  console.log('name',name);
  console.log('price',price);
  try {
    const showerCabin = await ShowerCabin.findOneAndUpdate(
      { _id: showerId },
      { $push: { dorsHandles: { name: name, price: price } } },
      { new: true }
    );

    await res.json(showerCabin);
  } catch (err) {
    console.error(err);
    throw new Error('Failed to add color to furniture');
  }
}

export const removeHandleDors = async (req, res) => {
  try {
    const { showerId, currentId } = req.body;

    const shower = await ShowerCabin.findOneAndUpdate(
      { _id: showerId },
      { $pull: { dorsHandles: { _id: currentId } } },
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

export const updateHandleDors = async (req,res) => {
  try {
      const {name, price, typeId} = req.body;

      const shower = await ShowerCabin.findOne(); // знаходимо один екземпляр моделі
    
      // знаходимо індекс елемента в масиві type
      const index = shower.dorsHandles.findIndex(item => item._id.toString() === typeId);
      
      // оновлюємо об'єкт goods відповідного типу
      shower.dorsHandles[index] = {
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

export const updateProcessingStandart = async (req,res) => {
  try {
      const {name, price, typeId} = req.body;

      const shower = await ShowerCabin.findOne(); // знаходимо один екземпляр моделі
    
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

    const shower = await ShowerCabin.findOneAndUpdate(
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
  try {
    const showerCabin = await ShowerCabin.findOneAndUpdate(
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

      const shower = await ShowerCabin.findOne(); // знаходимо один екземпляр моделі
    
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

    const shower = await ShowerCabin.findOneAndUpdate(
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
    const showerCabin = await ShowerCabin.findOneAndUpdate(
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

export const updateDefaultFurniture = async (req,res) => {
  try {
    const {newDefaultFurniture, index} = req.body;
    console.log('newDefaultFurniture',newDefaultFurniture);
    console.log('index',index);
    const showerCabin = await ShowerCabin.findOne(); // Отримуємо один запис ShowerCabin, можна використовувати інші методи для вибору потрібного запису

    if (showerCabin) {
      showerCabin.type[index].defaultFurniture = newDefaultFurniture; // Замінюємо старий defaultFurniture на новий

      await showerCabin.save(); // Зберігаємо зміни в базі даних
      res.json(newDefaultFurniture)
      console.log("Успішно оновлено defaultFurniture");
    } else {
      console.log("Запис ShowerCabin не знайдено");
    }
  } catch (error) {
    console.error("Помилка при оновленні defaultFurniture:", error);
  }
}

export const updateShowerCabinTypeImage = async (req, res) => {
  try {
    const { typeId, showerId } = req.body;

    if (!req.file) {
      return res.json({ message: 'No photo chosen' });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const shower = await ShowerCabin.findOneAndUpdate(
      { _id: showerId, "type._id": typeId },
      { $set: { "type.$[outer].showerImage": result.secure_url } },
      { new: true, arrayFilters: [{ "outer._id": typeId }] }
    );

    res.json(shower);
  } catch (e) {
    console.log(e);
  }
};

export const updateClientShowerCabinTypeImage = async (req,res) => {
  try {
    const {typeId, showerId} = req.body;

    if (!req.file) {
      return res.json({ message: 'No photo chosen' });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const shower = await ShowerCabin.findOneAndUpdate(
      { _id: showerId, "typeWordpress._id": typeId}, // умовний оператор
      { $set: { "typeWordpress.$[outer].showerImage": result.secure_url } },
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
    const parseData = JSON.stringify(data, null, 2);
    console.log('parseData',parseData);
    res.json({message: 'success'})
  }catch(e){
    console.log(e);
  }
}