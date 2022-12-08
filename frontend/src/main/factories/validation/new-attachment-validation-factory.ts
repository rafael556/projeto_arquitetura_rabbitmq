import { ValidationComposite } from "main/composites";
import { ValidationBuilder as Builder } from "main/builders";

export const makeNewAttachmentValidation = (): ValidationComposite =>
	ValidationComposite.build([
		...Builder.field("responsible").required().build(),
		...Builder.field("date").required().build(),
		...Builder.field("documentType").required().build(),
		...Builder.field("subject").required().build(),
		...Builder.field("justification").required().build(),
		...Builder.field("base64").required().build(),
	]);
