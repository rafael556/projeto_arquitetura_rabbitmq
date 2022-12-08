import { LoadAttachmentList } from "domain/usecases";

import { atom } from "recoil";

export const attachmentListState = atom({
	key: "attachmentListState",
	default: {
		attachments: [] as LoadAttachmentList.Model[],
		error: "",
		reload: false,
	},
});
