import { Router } from "express";
import { DeviceController } from "../controllers/DeviceController";

const router = Router();
const controller = new DeviceController();

router.post("/", controller.create);
router.patch("/:id", controller.update);
router.get("/", controller.findAll);

router.get("/brand/:brand", controller.findByBrand);
router.get("/state/:state", controller.findByState);
router.get("/:id", controller.findById);
router.delete("/:id", controller.delete);


export default router;
