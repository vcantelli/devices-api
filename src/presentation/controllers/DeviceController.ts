import { Request, Response } from "express";
import { PrismaDeviceRepository } from "@/infra/repositories/PrismaDeviceRepository";
import { CreateDevice } from "@/application/use-cases/CreateDevice";
import { UpdateDevice } from "@/application/use-cases/UpdateDevice";
import { DeleteDevice } from "@/application/use-cases/DeleteDevice";
import { GetDeviceById } from "@/application/use-cases/GetDeviceById";
import { GetAllDevices } from "@/application/use-cases/GetAllDevices";
import { GetDevicesByBrand } from "@/application/use-cases/GetDevicesByBrand";
import { GetDevicesByState } from "@/application/use-cases/GetDevicesByState";
import { DeviceState } from "@/domain/enums/DeviceState";
import {
  brandParamSchema,
  createDeviceSchema,
  idParamSchema,
  stateParamSchema,
  updateDeviceSchema
} from "../validators/deviceSchemas";

/**
 * Controller responsible for handling HTTP requests related to devices.
 * Delegates business logic to use cases and returns appropriate HTTP responses.
 */
export class DeviceController {
  private readonly repository = new PrismaDeviceRepository();

  /**
   * Handles POST /devices
   * Creates a new device based on validated request body.
   */
  create = async (req: Request, res: Response) => {
    try {
      const parsed = createDeviceSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }

      const { name, brand, state } = parsed.data;
      const useCase = new CreateDevice(this.repository);
      await useCase.execute({ name, brand, state: state as DeviceState });
      return res.status(201).send();
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  /**
   * Handles PATCH /devices/:id
   * Applies partial update to an existing device.
   */
  update = async (req: Request, res: Response) => {
    try {
      const parsed = updateDeviceSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }

      const { name, brand, state } = parsed.data;
      const param = idParamSchema.safeParse(req.params);
      if (!param.success) {
        return res.status(400).json({ error: param.error.errors });
      }

      const useCase = new UpdateDevice(this.repository);
      await useCase.execute({
        id: param.data.id,
        name,
        brand,
        state: state as DeviceState
      });

      return res.status(204).send();
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  /**
   * Handles DELETE /devices/:id
   * Deletes a device if allowed by business rules.
   */
  delete = async (req: Request, res: Response) => {
    try {
      const parsed = idParamSchema.safeParse(req.params);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }

      const useCase = new DeleteDevice(this.repository);
      await useCase.execute({ id: parsed.data.id });
      return res.status(204).send();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

  /**
   * Handles GET /devices/:id
   * Returns a single device by its ID, or 404 if not found.
   */
  findById = async (req: Request, res: Response) => {
    try {
      const parsed = idParamSchema.safeParse(req.params);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }

      const useCase = new GetDeviceById(this.repository);
      const device = await useCase.execute({ id: parsed.data.id });

      return device ? res.json(device) : res.status(404).send();
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  /**
   * Handles GET /devices
   * Returns all devices in the system.
   */
  findAll = async (_req: Request, res: Response) => {
    try {
      const useCase = new GetAllDevices(this.repository);
      const devices = await useCase.execute();
      return res.json(devices);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  /**
   * Handles GET /devices/brand/:brand
   * Returns all devices that match a given brand.
   */
  findByBrand = async (req: Request, res: Response) => {
    try {
      const parsed = brandParamSchema.safeParse(req.params);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }

      const useCase = new GetDevicesByBrand(this.repository);
      const devices = await useCase.execute({ brand: parsed.data.brand });
      return res.json(devices);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  /**
   * Handles GET /devices/state/:state
   * Returns all devices that match a given state.
   */
  findByState = async (req: Request, res: Response) => {
    try {
      const parsed = stateParamSchema.safeParse(req.params);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }

      const useCase = new GetDevicesByState(this.repository);
      const devices = await useCase.execute({ state: parsed.data.state });
      return res.json(devices);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };
}
