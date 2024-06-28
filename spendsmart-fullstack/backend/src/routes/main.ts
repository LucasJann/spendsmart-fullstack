import { Router } from "express";
import { Register } from "../controllers/admin";

const router = Router();

router.post("/", Register);

export default router;
