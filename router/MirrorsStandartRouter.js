import { Router } from "express";
import * as MirrorsStandartController from '../controller/MirrorsStandartController.js';

const router = new Router();

router.post('/create-standart-mirrors',MirrorsStandartController.create);
router.get('/get-all-standart-mirrors',MirrorsStandartController.getAll);

router.patch('/update-goods',MirrorsStandartController.updateGoods)
router.patch('/add-new-goods',MirrorsStandartController.addNewGoods)
router.delete('/remove-mirror-goods',MirrorsStandartController.removeGoods)

router.patch('/update-type',MirrorsStandartController.updateType)

router.delete('/remove-mirror-frame',MirrorsStandartController.removeFrame);
router.patch('/add-new-mirror-frame',MirrorsStandartController.addNewFrame);
router.patch('/update-mirror-frame',MirrorsStandartController.updateFrame);

router.delete('/remove-mirror-backlight',MirrorsStandartController.removeBackLight);
router.patch('/add-new-mirror-backlight',MirrorsStandartController.addNewBackLight);
router.patch('/update-mirror-backlight',MirrorsStandartController.updateBackLight);

router.delete('/remove-mirror-switch',MirrorsStandartController.removeSwitch);
router.patch('/add-new-mirror-switch',MirrorsStandartController.addNewSwitch);
router.patch('/update-mirror-switch',MirrorsStandartController.updateSwitch);

router.delete('/remove-mirror-color',MirrorsStandartController.removeColor);
router.patch('/add-new-mirror-color',MirrorsStandartController.addNewColor);
router.patch('/update-mirror-color',MirrorsStandartController.updateColor);

router.patch('/update-mirror-cord-price',MirrorsStandartController.updateCordPrice);

router.patch('/update-mirror-warmed-up-price',MirrorsStandartController.updateWarmedUp);

router.patch('/update-mirror-painting-price',MirrorsStandartController.updatePainting);

export default router;