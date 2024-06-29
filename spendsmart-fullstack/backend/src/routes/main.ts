import { Router } from "express";
import { Register, Login } from "../controllers/admin";

const router = Router();

router.post("/", Register);
router.post('/login', Login)


export default router;
