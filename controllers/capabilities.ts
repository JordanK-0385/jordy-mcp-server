import { Request, Response } from "express";
import capabilities from "../capabilities.json";

export const capabilitiesHandler = (req: Request, res: Response) => {
  res.json({ capabilities });
};
