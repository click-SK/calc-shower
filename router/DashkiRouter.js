import { Router } from "express";
import * as DashkiController from '../controller/DashkiController.js';

const router = new Router();

router.post('/create-dashki',DashkiController.create);
router.get('/get-all-dashki',DashkiController.getAll);
router.delete('/remove-dashki-type',DashkiController.removeDashkiType);
router.patch('/add-new-dashki-type',DashkiController.addNewType);
router.patch('/update-dashki-type',DashkiController.updateDashkiType);
router.patch('/update-dashki-size',DashkiController.updateDashkiSize);
router.delete('/remove-dashki-color',DashkiController.removeDashkiColor);
router.patch('/update-dashki-color',DashkiController.updateDashkiColor);

router.patch('/add-furniture',DashkiController.addFurniture);
router.patch('/update-furniture-color',DashkiController.changeFurnitureColors);

router.patch('/update-dashki-furniture-depends',DashkiController.updateDashkiCabinFurnitureDepends);
router.patch('/update-dashki-furniture-main-image',DashkiController.upload.single('mainImage'),DashkiController.updateDashkiCabinFurnitureMainImage);
router.patch('/update-dashki-furniture-second-image',DashkiController.upload.single('drawingImg'),DashkiController.updateDashkiCabinFurnitureSecondImage);
router.patch('/update-dashki-furniture-title',DashkiController.updateDashkiCabinFurnitureTitle);
router.patch('/add-new-dashki-furniture-colors',DashkiController.addNewFurnitureColors);
router.delete('/remove-dashki-furniture-colors',DashkiController.removeFurnitureColors);
router.delete('/remove-dashki-furniture',DashkiController.removeDashkiFurniture);
export default router;