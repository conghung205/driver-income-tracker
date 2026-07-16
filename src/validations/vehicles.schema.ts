import z from "zod";

export const createVehicleSchema = z.object({
    type: z.enum(["MOTORBIKE", "CAR"]),
    brand: z.string().min(1, "The brand must not be left blank."),
    model: z.string().min(1, "The model must not be left blank."),
    plate: z
        .string()
        .min(1, "The license plate number must not be left blank."),
});
export const updateVehicleSchema = createVehicleSchema.partial();
