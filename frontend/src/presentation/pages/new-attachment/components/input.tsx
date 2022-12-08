import { InputBase } from "@/presentation/components";

import React, { useState } from "react";
import { newAttachmentState } from "./new-attachment-state";

type Props = {
	type: string;
	name: string;
	placeholder: string;
};

const Input: React.FC<Props> = ({ type, name, placeholder }: Props) => {
	const [state, setState] = useState(newAttachmentState);

	return <InputBase type={type} name={name} placeholder={placeholder} state={state} setState={setState} />;
};

export default Input;
