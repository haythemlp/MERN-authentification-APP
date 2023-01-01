import { Router } from "express";
import { check } from "express-validator";
import AuthController from "../controllers/AuthController";
import { checkAccessToken } from "../middlewares/checkAccessToken";
import { checkRefreshToken } from "../middlewares/checkRefreshToken";

const router = Router();
//Register route
router.post("/register", [
    check("firstname", "firstname is required").exists(),
    check("lastname", "lastname is required").exists(),
    check("email", "Please include a valid email").isEmail(),
    check(
        "password",
        "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
], AuthController.register);

//Login route
router.post("/login", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
], AuthController.login);


//refresh token route
router.post("/refresh",[checkRefreshToken], AuthController.refreshToken);

//get current user
router.get("/me", [checkAccessToken], AuthController.me);

export default router;