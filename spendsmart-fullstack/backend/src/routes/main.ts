import express from 'express';
const controllerAdmin = require('../controllers/admin')

const router = express.Router();

router.use('/', controllerAdmin.Register);

export default router;
