import Styles from "./input-styles.module.scss";

import React, { useRef } from "react";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
	type: string;
	state: any;
	setState: any;
};

const Input: React.FC<Props> = ({ type = "text", state, setState, ...props }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const error = state[`${props.name}Error`];

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (type === "file") {
			const file = e.target.files?.item(0);
			const name = e.target.name;

			if (!file) return;

			var reader = new FileReader();

			reader.onload = (function (theFile) {
				return function (e) {
					var binaryData = e.target?.result;

					var base64String = window.btoa(binaryData?.toString() ?? "");

					setState({ ...state, [name]: base64String });
				};
			})(file);
			reader.readAsBinaryString(file);
		}
		setState({ ...state, [e.target.name]: e.target.value });
	};

	return (
		<div className={Styles.inputWrap} data-status={error ? "invalid" : "valid"}>
			<input
				{...props}
				type={type}
				ref={inputRef}
				title={error}
				placeholder=" "
				readOnly
				onFocus={e => {
					e.target.readOnly = false;
				}}
				onChange={handleChange}
			/>
			<label
				onClick={() => {
					inputRef.current?.focus();
				}}
				title={error}
			>
				{props.placeholder}
			</label>
		</div>
	);
};

export default Input;
