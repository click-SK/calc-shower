import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import * as ShowerCabinController from './controller/ShowerCabinController.js';
import * as MirrorsStandartController from './controller/MirrorsStandartController.js';

dotenv.config();
const app = express();
const db = 'mongodb+srv://roskichuk:qwerty12345@cluster0.nbpu5rm.mongodb.net/?retryWrites=true&w=majority';

mongoose
.connect(db)
.then(() => {
    console.log('DB Strat')
})
app.use(cors());
app.use(express.json())

app.post('/create-shower',ShowerCabinController.create);
app.post('/create-standart-mirrors',MirrorsStandartController.create);
app.get('/get-all-shower',ShowerCabinController.getAll);
app.patch('/add-furniture',ShowerCabinController.addFurniture);
app.patch('/update-furniture-color',ShowerCabinController.changeFurnitureColors);
app.patch('/update-shower-colors',ShowerCabinController.updateShowerCabinColors);
app.patch('/update-shower-glass',ShowerCabinController.updateGlassThickness);
app.patch('/update-shower-type',ShowerCabinController.updateShowerCabinType);
app.patch('/update-shower-color',ShowerCabinController.updateShowerCabinColor);
app.patch('/update-shower-size',ShowerCabinController.updateShowerCabinSize);
app.patch('/update-shower-furniture-depends',ShowerCabinController.updateShowerCabinFurnitureDepends);
app.patch('/update-shower-furniture-main-image',ShowerCabinController.upload.single('mainImage'),ShowerCabinController.updateShowerCabinFurnitureMainImage);
app.patch('/update-shower-furniture-second-image',ShowerCabinController.upload.single('drawingImg'),ShowerCabinController.updateShowerCabinFurnitureSecondImage);
app.patch('/update-shower-furniture-title',ShowerCabinController.updateShowerCabinFurnitureTitle);
app.patch('/add-new-shower-furniture-colors',ShowerCabinController.addNewFurnitureColors);
app.delete('/remove-shower-furniture-colors',ShowerCabinController.removeFurnitureColors);
app.delete('/remove-shower-furniture',ShowerCabinController.removeShowerFurniture);
app.delete('/remove-shower-glass-thickness',ShowerCabinController.removeShowerGlassThickness);
app.patch('/add-new-glass-thickness',ShowerCabinController.addNewGlassThickness);
app.delete('/remove-shower-type',ShowerCabinController.removeShowerType);
app.patch('/add-new-shower-type',ShowerCabinController.addNewType);

app.get('/get-all-standart-mirrors',MirrorsStandartController.getAll);

app.patch('/update-goods',MirrorsStandartController.updateGoods)
app.patch('/update-type',MirrorsStandartController.updateType)

app.listen(process.env.PORT,() => {
    console.log('server start',process.env.PORT)
})