import { z } from 'zod';

export const otherSchema = z.object({
	memorandumOfAssociation: z.instanceof(Buffer),
	shareCertificate: z.instanceof(Buffer),
	businessProfile: z.instanceof(Buffer),
	visa: z.instanceof(Buffer),
	userSessionId: z.string()
});

export type OtherDto = z.infer<typeof otherSchema>;
