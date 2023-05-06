import { Router } from "express";
import * as DashkiController from '../controller/DashkiController.js';

const router = new Router();

router.post('/create-dashki',DashkiController.create);
router.get('/get-all-dashki',DashkiController.getAll);
router.delete('/remove-dashki-type',DashkiController.removeDashkiType);
router.patch('/add-new-dashki-type',DashkiController.addNewType);
router.patch('/add-new-dashki-color',DashkiController.addNewColor);
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

router.delete('/remove-dashki-processing-standart',DashkiController.removeProcessingStandart);
router.patch('/add-new-dashki-processing-standart',DashkiController.addNewProcessingStandart);
router.patch('/update-dashki-processing-standart',DashkiController.updateProcessingStandart);

router.delete('/remove-dashki-processing-cutout',DashkiController.removeProcessingСutout);
router.patch('/add-new-dashki-processing-cutout',DashkiController.addNewProcessingСutout);
router.patch('/update-dashki-processing-cutout',DashkiController.updateProcessingСutout);


router.post('/create-crm',DashkiController.createCRM);

export default router;