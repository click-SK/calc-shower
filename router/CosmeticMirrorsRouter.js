import { Router } from "express";
import * as CosmeticMirrorsController from '../controller/CosmeticMirrorsController.js';

const router = new Router();

router.post('/create-cosmetic-mirrors',CosmeticMirrorsController.create);
router.get('/get-all-cosmetic-mirrors',CosmeticMirrorsController.getAll);

export default router;