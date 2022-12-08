import Styles from "./new-attachment-styles.module.scss";
import { newAttachmentState, Input, SubmitButton, FormStatus } from "./components";
import { Footer, Header } from "@/presentation/components";
import { Validation } from "@/presentation/protocols";
import { AddAttachment } from "@/domain/usecases";

import { Link, redirect } from "react-router-dom";

import React, { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";

type Props = {
	validation: Validation;
	addAttachment: AddAttachment;
};

const NewAttachment: React.FC<Props> = ({ validation, addAttachment }: Props) => {
	const [state, setState] = useState(newAttachmentState);

	const validate = useCallback(
		(field: string): void => {
			const { responsible, date, documentType, subject, justification, base64 } = state;
			const formData = { responsible, date, documentType, subject, justification, base64 };

			setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }));

			setState(old => ({
				...old,
				isFormInvalid:
					!!old.responsibleError ||
					!!old.dateError ||
					!!old.documentTypeError ||
					!!old.subjectError ||
					!!old.justificationError ||
					!!old.base64Error,
			}));
		},
		[state, validation]
	);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		try {
			if (state.isLoading || state.isFormInvalid) {
				return;
			}
			setState(old => ({ ...old, isLoading: true }));
			await addAttachment.add({
				responsible: state.responsible,
				date: state.date,
				documentType: state.documentType,
				subject: state.subject,
				justification: state.justification,
				base64: state.base64,
			});

			redirect("/attachments");
		} catch (error) {
			const err = error as AxiosError;

			setState(old => ({
				...old,
				isLoading: false,
				mainError: err.message,
			}));
		}
	};

	useEffect(() => validate("responsible"), [state.responsible, validate]);
	useEffect(() => validate("date"), [state.date, validate]);
	useEffect(() => validate("documentType"), [state.documentType, validate]);
	useEffect(() => validate("subject"), [state.subject, validate]);
	useEffect(() => validate("justification"), [state.justification, validate]);
	useEffect(() => validate("base64"), [state.base64, validate]);

	return (
		<div className={Styles.signupWrap}>
			<Header />
			<form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
				<h2>Adicionar Anexo</h2>

				<Input type="date" name="date" placeholder="Digite a date" />
				<Input type="text" name="documentType" placeholder="Digite a documentType" />
				<Input type="text" name="subject" placeholder="Digite a subject" />
				<Input type="text" name="justification" placeholder="Digite a justification" />
				<Input type="text" name="base64" placeholder="Digite a base64" />

				<SubmitButton text="Cadastrar" />
				<Link to="/attachments" className={Styles.link}>
					Voltar Para Listagem
				</Link>
				<FormStatus />
			</form>
			<Footer />
		</div>
	);
};

export default NewAttachment;