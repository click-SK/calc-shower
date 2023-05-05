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