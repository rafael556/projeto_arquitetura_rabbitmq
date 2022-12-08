import Styles from "./input-styles.module.scss";

import React, { useRef } from "react";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
	state: any;
	setState: any;
};

const Input: React.FC<Props> = ({ state, setState, ...props }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const error = state[`${props.name}Error`];

	return (
		<div className={Styles.inputWrap} data-status={error ? "invalid" : "valid"}>
			<input
				{...props}
				ref={inputRef}
				title={error}
				readOnly
				onFocus={e => {
					e.target.readOnly = false;
				}}
				onChange={e => {
					setState({ ...state, [e.target.name]: e.target.value });
				}}
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
