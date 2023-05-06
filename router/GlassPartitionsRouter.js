import { Router } from "express";
import * as GlassPartitionsController from '../controller/GlassPartitionsController.js';

const router = new Router();

router.post('/create-glass-partitions',GlassPartitionsController.create);
router.get('/get-all-glass-partitions',GlassPartitionsController.getAll);

router.delete('/remove-glass-partitions-processing-standart',GlassPartitionsController.removeProcessingStandart);
router.patch('/add-new-glass-partitions-processing-standart',GlassPartitionsController.addNewProcessingStandart);
router.patch('/update-glass-partitions-processing-standart',GlassPartitionsController.updateProcessingStandart);

router.delete('/remove-glass-partitions-processing-cutout',GlassPartitionsController.removeProcessingСutout);
router.patch('/add-new-glass-partitions-processing-cutout',GlassPartitionsController.addNewProcessingСutout);
router.patch('/update-glass-partitions-processing-cutout',GlassPartitionsController.updateProcessingСutout);

router.delete('/remove-glass-partitions-color',GlassPartitionsController.removeColor);
router.patch('/update-glass-partitions-color',GlassPartitionsController.updateColor);
router.patch('/add-new-glass-partitions-color',GlassPartitionsController.addNewColor);

router.patch('/update-glass-partitions-size',GlassPartitionsController.updateSize);

router.patch('/update-glass-partitions-type',GlassPartitionsController.updateType);
router.delete('/remove-glass-partitions-type',GlassPartitionsController.removeType);
router.patch('/add-new-glass-partitions-type',GlassPartitionsController.addNewType);

router.patch('/update-glass-partitions-colors',GlassPartitionsController.updateTypePartitionsColors);

router.patch('/glass-partitions-add-furniture',GlassPartitionsController.addFurniture);
router.patch('/glass-partitions-update-furniture-color',GlassPartitionsController.changeFurnitureColors);

router.patch('/update-glass-partitions-furniture-depends',GlassPartitionsController.updateFurnitureDepends);
router.patch('/update-glass-partitions-furniture-main-image',GlassPartitionsController.upload.single('mainImage'),GlassPartitionsController.updateFurnitureMainImage);
router.patch('/update-glass-partitions-furniture-second-image',GlassPartitionsController.upload.single('drawingImg'),GlassPartitionsController.updateFurnitureSecondImage);
router.patch('/update-glass-partitions-furniture-title',GlassPartitionsController.updateFurnitureTitle);
router.patch('/add-new-glass-partitions-furniture-colors',GlassPartitionsController.addNewFurnitureColors);
router.delete('/remove-glass-partitions-furniture-colors',GlassPartitionsController.removeFurnitureColors);
router.delete('/remove-glass-partitions-furniture',GlassPartitionsController.removeFurniture);

export default router;