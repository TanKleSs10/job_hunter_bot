import { z } from "zod";

export const CreateProfileSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.email("Email inválido"),
  location: z.string().min(1, "La ubicación es requerida"),
  minimumSalary: z
    .number()
    .min(0, "El salario mínimo debe ser mayor o igual a 0"),
  keywords: z.string(),
  curriculumPath: z.string().min(1, "El CV es requerido"),
  alertsEnabled: z.boolean().optional().default(true),
  searchFrequency: z.string().min(1, "La frecuencia de búsqueda es requerida"),
  notificationChannel: z.string().nullable().optional(),
  discordWebhookUrl: z.url().nullable().optional(),
});

export const UpdateProfileSchema = z
  .object({
    name: z.string().optional(),
    location: z.string().optional(),
    minimumSalary: z.number().optional(),
    keywords: z.union([z.string(), z.array(z.string())]).optional(),
    curriculumPath: z.string().optional(),
    alertsEnabled: z.boolean().optional(),
    searchFrequency: z.string().optional(),
    notificationChannel: z.string().optional(),
    discordWebhookUrl: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateProfileDto = z.infer<typeof CreateProfileSchema>;
export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;
