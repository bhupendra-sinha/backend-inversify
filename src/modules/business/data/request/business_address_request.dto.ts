import z from 'zod';

export const businessAddressSchema = z.object({
	document: z.array(z.instanceof(Buffer)),
	userSessionId: z.uuid()
});

export type BusinessAddressDto = z.infer<typeof businessAddressSchema>;
