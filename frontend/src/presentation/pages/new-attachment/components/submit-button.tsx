import { SubmitButtonBase } from "presentation/components";
import { newAttachmentState } from "./new-attachment-state";

import { useRecoilValue } from "recoil";
import React from "react";

type Props = {
	text: string;
};

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
	const state = useRecoilValue(newAttachmentState);

	return <SubmitButtonBase text={text} state={state} />;
};

export default SubmitButton;
