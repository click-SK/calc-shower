import { Router } from "express";
import * as GlassPartitionsController from '../controller/GlassPartitionsController.js';

const router = new Router();

router.post('/create-glass-partitions',GlassPartitionsController.create);
router.get('/get-all-glass-partitions',GlassPartitionsController.getAll);

export default router;