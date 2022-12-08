import { AttachmentModel } from "@/domain/models";

export interface AddAttachment {
	add: (params: AddAttachment.Params) => Promise<AddAttachment.Model>;
}

export namespace AddAttachment {
	export type Params = {
		responsible: string;
		date: Date;
		documentType: string;
		subject: string;
		justification: string;
        base64: string;
	};

	export type Model = AttachmentModel;
}
