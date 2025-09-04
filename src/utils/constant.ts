import z from 'zod';

export enum DocumentType {
	TRADE_LICENSE = 'TRADE_LICENSE',
	EMIRATES_ID = 'EMIRATES_ID',
	PASSPORT = 'PASSPORT',
	MOA = 'MEMORANDUM_OF_ASSOCIATION',
	SHARE_CERTIFICATE = 'SHARE_CERTIFICATE',
	BANK_STATEMENT = 'BANK_STATEMENT',
	LEASE_AGREEMENT = 'LEASE_AGREEMENT',
	AUDITED_FINANCIALS = 'AUDITED_FINANCIALS',
	BUSINESS_PROFILE = 'BUSINESS_PROFILE',
	VISA = 'VISA'
}

export enum DocumentStatus {
	VERIFIED = 'VERIFIED',
	PENDING = 'PENDING',
	REJECTED = 'REJECTED'
}

// base schema for any Multer file
export const UploadedFileSchema = z.object({
	fieldname: z.string(),
	originalname: z.string(),
	encoding: z.string(),
	mimetype: z.string().regex(/^image\/(jpeg|png|jpg|gif|pdf)$/i, {
		message: 'Only image or PDF files are allowed'
	}),
	size: z.number().positive(),
	buffer: z.instanceof(Buffer),
	destination: z.string().optional(),
	filename: z.string().optional(),
	path: z.string().optional()
});
