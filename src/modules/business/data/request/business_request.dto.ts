import z from 'zod';

export const businessSchema = z.object({
	tradeLicense: z.array(z.instanceof(Buffer)),
	userSessionId: z.uuid()
});

export type BusinessDto = z.infer<typeof businessSchema>;
