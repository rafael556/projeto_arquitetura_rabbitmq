export type Attachment = {
	responsible: string;
	date: string;
	documentType: string;
	subject: string;
	justification: string;
};

export type AttachmentCreateRequest = {
	base64: string;
} & Attachment;

export type AttachmentResponse = {
	id: string;
	createdAt: Date;
	fileUrl: string;
} & Attachment;
