import z from 'zod';

export const businessDetailsSchema = z.object({
	tradeLicense: z.instanceof(Buffer),
	userSessionId: z.uuid()
});

export type BusinessDetailsDto = z.infer<typeof businessDetailsSchema>;
