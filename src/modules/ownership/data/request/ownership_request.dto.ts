import z from 'zod';

export const ownershipSchema = z.object({
	passport: z.instanceof(Buffer),
	emiratesId: z.instanceof(Buffer),
	userSessionId: z.string()
});

export type OwnershipDto = z.infer<typeof ownershipSchema>;
