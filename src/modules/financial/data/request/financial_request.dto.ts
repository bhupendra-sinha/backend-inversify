import z from 'zod';

export const financialSchema = z.object({
	bankStatement: z.array(z.instanceof(Buffer)),
	auditedFinancials: z.array(z.instanceof(Buffer)),
	userSessionId: z.string()
});

export type FinancialDto = z.infer<typeof financialSchema>;
