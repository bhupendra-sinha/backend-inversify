import z from 'zod';
import { UploadedFileSchema } from '@utils/constant';

export const ownershipSchema = z.object({
	passport: UploadedFileSchema,
	emiratesId: UploadedFileSchema,
	userSessionId: z.string()
});

export type OwnershipDto = z.infer<typeof ownershipSchema>;
