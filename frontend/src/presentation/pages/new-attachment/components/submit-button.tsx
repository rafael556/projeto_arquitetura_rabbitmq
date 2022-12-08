import { SubmitButtonBase } from "@/presentation/components";
import { newAttachmentState } from "./new-attachment-state";

import React from "react";

type Props = {
	text: string;
};

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
	return <SubmitButtonBase text={text} state={newAttachmentState} />;
};

export default SubmitButton;
