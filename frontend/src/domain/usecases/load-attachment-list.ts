import { AttachmentModel } from "@/domain/models";

export interface LoadAttachmentList {
	loadAll: () => Promise<LoadAttachmentList.Model[]>;
}

export namespace LoadAttachmentList {
	export type Model = AttachmentModel;
}
