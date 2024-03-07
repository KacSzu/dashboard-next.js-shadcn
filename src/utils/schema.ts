import { z } from "zod";
export const ProjectFormSchema = z.object({
  projectType: z.string().min(1, "Project type is required."),
  price: z.number().min(1, "Price must be greater than 0."),
  name: z.string().min(1, "Name is required."),
  avatar: z.string().min(1, "Avatar is required."),
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
});

export type TProject = z.infer<typeof ProjectFormSchema>;
