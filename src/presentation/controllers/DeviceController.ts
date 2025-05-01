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

export class DeviceController {
  private readonly repository = new PrismaDeviceRepository();

  create = async (req: Request, res: Response) => {
    try {
      const { name, brand, state } = req.body;

      if (!Object.values(DeviceState).includes(state)) {
        return res.status(400).json({ error: "Invalid device state" });
      }

      const useCase = new CreateDevice(this.repository);
      await useCase.execute({ name, brand, state });
      return res.status(201).send();
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { name, brand, state } = req.body;

      if (state && !Object.values(DeviceState).includes(state)) {
        return res.status(400).json({ error: "Invalid device state" });
      }

      const useCase = new UpdateDevice(this.repository);
      await useCase.execute({ id: req.params.id, name, brand, state });
      return res.status(204).send();
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const useCase = new DeleteDevice(this.repository);
      await useCase.execute({ id: req.params.id });
      return res.status(204).send();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const useCase = new GetDeviceById(this.repository);
      const device = await useCase.execute({ id: req.params.id });
      return device ? res.json(device) : res.status(404).send();
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  findAll = async (_req: Request, res: Response) => {
    try {
      const useCase = new GetAllDevices(this.repository);
      const devices = await useCase.execute();
      return res.json(devices);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  findByBrand = async (req: Request, res: Response) => {
    try {
      const useCase = new GetDevicesByBrand(this.repository);
      const devices = await useCase.execute({ brand: req.params.brand });
      return res.json(devices);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  findByState = async (req: Request, res: Response) => {
    try {
      const { state } = req.params;

      if (!Object.values(DeviceState).includes(state as DeviceState)) {
        return res.status(400).json({ error: "Invalid device state" });
      }

      const useCase = new GetDevicesByState(this.repository);
      const devices = await useCase.execute({ state: state as DeviceState });
      return res.json(devices);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };
}
