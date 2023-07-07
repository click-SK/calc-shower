import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import DashkiRouter from './router/DashkiRouter.js';
import GlassPartitionsRouter from './router/GlassPartitionsRouter.js';
import MirrorsStandartRouter from './router/MirrorsStandartRouter.js';
import CosmeticMirrorsRouter from './router/CosmeticMirrorsRouter.js'
import ShowerCabinRouter from './router/ShowerCabinRouter.js'

dotenv.config();
const app = express();
const db = 'mongodb+srv://roskichuk:qwerty12345@cluster0.nbpu5rm.mongodb.net/?retryWrites=true&w=majority';

mongoose
.connect(db)
.then(() => {
    console.log('DB Strat')
})
app.use(cors());
app.use(express.json())

app.use(DashkiRouter);
app.use(GlassPartitionsRouter);
app.use(MirrorsStandartRouter);
app.use(CosmeticMirrorsRouter);
app.use(ShowerCabinRouter);

app.listen(process.env.PORT,() => {
    console.log('server start',process.env.PORT)
})
