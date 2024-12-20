import { z } from 'zod';

export const ImageUploadSchema = z.object({
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      'File size must be less than 2MB'
    )
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      'File must be a JPEG, PNG, or JPG image'
    ),
});

export type ImageUploadDTO = z.infer<typeof ImageUploadSchema>;
