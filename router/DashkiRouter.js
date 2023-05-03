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
export default router;