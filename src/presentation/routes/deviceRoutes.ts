import { Router } from "express";
import { DeviceController } from "../controllers/DeviceController";

const router = Router();
const controller = new DeviceController();

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: API for managing devices
 */

/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Create a new device
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - brand
 *               - state
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               state:
 *                 type: string
 *                 enum: [available, in-use, inactive]
 *     responses:
 *       201:
 *         description: Device created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", controller.create);

/**
 * @swagger
 * /devices/{id}:
 *   patch:
 *     summary: Update an existing device
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               state:
 *                 type: string
 *                 enum: [available, in-use, inactive]
 *     responses:
 *       204:
 *         description: Device updated successfully
 *       400:
 *         description: Invalid input or business rule violation
 */
router.patch("/:id", controller.update);

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Get all devices
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: List of all devices
 */
router.get("/", controller.findAll);

/**
 * @swagger
 * /devices/brand/{brand}:
 *   get:
 *     summary: Get devices by brand
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: brand
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of devices with the specified brand
 */
router.get("/brand/:brand", controller.findByBrand);

/**
 * @swagger
 * /devices/state/{state}:
 *   get:
 *     summary: Get devices by state
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *           enum: [available, in-use, inactive]
 *     responses:
 *       200:
 *         description: List of devices in the specified state
 *       400:
 *         description: Invalid state value
 */
router.get("/state/:state", controller.findByState);

/**
 * @swagger
 * /devices/{id}:
 *   get:
 *     summary: Get a device by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: The requested device
 *       404:
 *         description: Device not found
 */
router.get("/:id", controller.findById);

/**
 * @swagger
 * /devices/{id}:
 *   delete:
 *     summary: Delete a device by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Device deleted successfully
 *       400:
 *         description: Cannot delete device that is in use
 */
router.delete("/:id", controller.delete);

export default router;
