import expr from "express";
import { register } from "../controllers/auth.js";

const router = expr.Router();

router.post('/register',register)
export default  router;