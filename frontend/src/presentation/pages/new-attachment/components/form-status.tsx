import { newAttachmentState } from "./new-attachment-state";
import { FormStatusBase } from "presentation/components";

import React from "react";

const FormStatus: React.FC = () => {
	return <FormStatusBase state={newAttachmentState} />;
};

export default FormStatus;
