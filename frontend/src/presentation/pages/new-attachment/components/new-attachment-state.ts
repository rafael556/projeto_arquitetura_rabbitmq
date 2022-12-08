import { atom } from "recoil";

export const newAttachmentState = atom({
	key: "newAttachmentState",
	default: {
		isLoading: false,
		isFormInvalid: true,
		responsible: "",
		date: new Date(),
		documentType: "",
		subject: "",
		justification: "",
		base64: "",
		responsibleError: "",
		dateError: "",
		documentTypeError: "",
		subjectError: "",
		justificationError: "",
		base64Error: "",
		mainError: "",
	},
});
