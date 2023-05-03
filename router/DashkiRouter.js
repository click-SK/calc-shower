import { Router } from "express";
import * as DashkiController from '../controller/DashkiController.js';

const router = new Router();

router.post('/create-dashki',DashkiController.create);
router.get('/get-all-dashki',DashkiController.getAll);

export default router;