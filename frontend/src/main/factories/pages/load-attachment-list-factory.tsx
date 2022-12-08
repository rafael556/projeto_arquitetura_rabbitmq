import { makeRemoteLoadAttachmentList } from "main/factories/usecases";
import { AttachmentList } from "presentation/pages";

import React from "react";

export const MakeAttachmentList: React.FC = () => {
	return <AttachmentList loadAttachmentList={makeRemoteLoadAttachmentList()} />;
};
