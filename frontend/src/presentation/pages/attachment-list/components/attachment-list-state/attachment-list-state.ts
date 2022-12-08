import { LoadAttachmentList } from "@/domain/usecases";

export const attachmentListState = {
	attachments: [] as LoadAttachmentList.Model[],
	error: "",
	reload: false,
};
