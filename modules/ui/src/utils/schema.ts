import { z } from "zod";

export const createAssetFormSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Name should be minimum of 3 characters" }),
    owner: z.string(),
    os: z.string(),
    osVersion: z.string(),
    model: z.string(),
    assetType: z.string(),
    classification: z.string(),
    assetValue: z.number(),
  });