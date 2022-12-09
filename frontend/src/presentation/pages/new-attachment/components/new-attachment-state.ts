import { atom } from "recoil";

export const newAttachmentState = atom({
	key: "newAttachmentState",
	default: {
		isLoading: false,
		isFormInvalid: true,
		responsible: "",
		documentType: "",
		subject: "",
		justification: "",
		base64: "",
		responsibleError: "",
		documentTypeError: "",
		subjectError: "",
		justificationError: "",
		base64Error: "",
		mainError: "",
	},
});
