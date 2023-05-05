import { Router } from "express";
import * as ShowerCabinController from '../controller/ShowerCabinController.js';

const router = new Router();

router.post('/create-shower',ShowerCabinController.create);
router.get('/get-all-shower',ShowerCabinController.getAll);
router.patch('/add-furniture',ShowerCabinController.addFurniture);
router.patch('/update-furniture-color',ShowerCabinController.changeFurnitureColors);
router.patch('/update-shower-colors',ShowerCabinController.updateShowerCabinColors);
router.patch('/update-shower-glass',ShowerCabinController.updateGlassThickness);
router.patch('/update-shower-type',ShowerCabinController.updateShowerCabinType);
router.patch('/update-shower-color',ShowerCabinController.updateShowerCabinColor);
router.patch('/update-shower-size',ShowerCabinController.updateShowerCabinSize);
router.patch('/update-shower-furniture-depends',ShowerCabinController.updateShowerCabinFurnitureDepends);
router.patch('/update-shower-furniture-main-image',ShowerCabinController.upload.single('mainImage'),ShowerCabinController.updateShowerCabinFurnitureMainImage);
router.patch('/update-shower-furniture-second-image',ShowerCabinController.upload.single('drawingImg'),ShowerCabinController.updateShowerCabinFurnitureSecondImage);
router.patch('/update-shower-furniture-title',ShowerCabinController.updateShowerCabinFurnitureTitle);
router.patch('/add-new-shower-furniture-colors',ShowerCabinController.addNewFurnitureColors);
router.delete('/remove-shower-furniture-colors',ShowerCabinController.removeFurnitureColors);
router.delete('/remove-shower-furniture',ShowerCabinController.removeShowerFurniture);
router.delete('/remove-shower-glass-thickness',ShowerCabinController.removeShowerGlassThickness);
router.patch('/add-new-glass-thickness',ShowerCabinController.addNewGlassThickness);
router.delete('/remove-shower-type',ShowerCabinController.removeShowerType);
router.patch('/add-new-shower-type',ShowerCabinController.addNewType);

//-------Клієт

router.delete('/remove-shower-client-type',ShowerCabinController.removeShowerClientType);
router.patch('/add-new-shower-client-type',ShowerCabinController.addNewClientType);
router.patch('/update-shower-client-type',ShowerCabinController.updateShowerClientType);

//--------------Ручки

router.delete('/remove-shower-handle-dors',ShowerCabinController.removeHandleDors);
router.patch('/add-new-shower-handle-dors',ShowerCabinController.addNewHandleDors);
router.patch('/update-shower-handle-dors',ShowerCabinController.updateHandleDors);

export default router;