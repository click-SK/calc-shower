import { Router } from "express";
import * as MirrorsStandartController from '../controller/MirrorsStandartController.js';

const router = new Router();

router.post('/create-standart-mirrors',MirrorsStandartController.create);
router.get('/get-all-standart-mirrors',MirrorsStandartController.getAll);

router.patch('/update-goods',MirrorsStandartController.updateGoods)
router.patch('/update-type',MirrorsStandartController.updateType)

export default router;