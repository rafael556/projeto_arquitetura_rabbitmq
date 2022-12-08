import { makeNewAttachmentValidation } from "main/factories/validation";
import { makeRemoteAddAttachment } from "main/factories/usecases";
import { NewAttachment } from "presentation/pages";

import React from "react";

export const MakeNewAttachment: React.FC = () => {
	return <NewAttachment addAttachment={makeRemoteAddAttachment()} validation={makeNewAttachmentValidation()} />;
};
