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

export const removeDashkiType = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
  
      const shower = await Dashki.findOneAndUpdate(
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

  export const addNewType = async (req,res) => {
    const { showerId, name, price } = req.body;
    console.log('WORK!!!');
    try {
      const showerCabin = await Dashki.findOneAndUpdate(
        { _id: showerId },
        { $push: { "typeGlass": { name: name, price: price } } },
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

  export const removeDashkiColor = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
  
      const shower = await Dashki.findOneAndUpdate(
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