import z from 'zod';

export const ownershipSchema = z.object({
	passport: z.array(z.instanceof(Buffer)),
	emiratesId: z.array(z.instanceof(Buffer)),
	userSessionId: z.string()
});

export type OwnershipDto = z.infer<typeof ownershipSchema>;
