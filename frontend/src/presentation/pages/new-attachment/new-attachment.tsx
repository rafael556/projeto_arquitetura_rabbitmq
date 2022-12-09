/* eslint-disable react-hooks/exhaustive-deps */
import Styles from "./new-attachment-styles.module.scss";
import { newAttachmentState, Input, SubmitButton, FormStatus } from "./components";
import { Footer, Header } from "presentation/components";
import { Validation } from "presentation/protocols";
import { AddAttachment } from "domain/usecases";

import { Link, useNavigate } from "react-router-dom";

import { useRecoilState, useResetRecoilState } from "recoil";
import React, { useEffect } from "react";
import { AxiosError } from "axios";

type Props = {
	validation: Validation;
	addAttachment: AddAttachment;
};

const NewAttachment: React.FC<Props> = ({ validation, addAttachment }: Props) => {
	const resetNewAttachmentState = useResetRecoilState(newAttachmentState);

	const navigate = useNavigate();

	const [state, setState] = useRecoilState(newAttachmentState);

	useEffect(() => resetNewAttachmentState(), []);
	useEffect(() => validate("responsible"), [state.responsible]);
	useEffect(() => validate("documentType"), [state.documentType]);
	useEffect(() => validate("subject"), [state.subject]);
	useEffect(() => validate("justification"), [state.justification]);
	useEffect(() => validate("base64"), [state.base64]);

	const validate = (field: string): void => {
		const { responsible, documentType, subject, justification, base64 } = state;
		const formData = { responsible, documentType, subject, justification, base64 };

		setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }));

		setState(old => ({
			...old,
			isFormInvalid:
				!!old.responsibleError ||
				!!old.documentTypeError ||
				!!old.subjectError ||
				!!old.justificationError ||
				!!old.base64Error,
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		try {
			if (state.isLoading || state.isFormInvalid) {
				return;
			}
			setState(old => ({ ...old, isLoading: true }));

			await addAttachment.add({
				responsible: state.responsible,
				date: new Date(),
				documentType: state.documentType,
				subject: state.subject,
				justification: state.justification,
				base64: state.base64,
			});

			navigate("/attachments");
		} catch (error) {
			const err = error as AxiosError;

			setState(old => ({
				...old,
				isLoading: false,
				mainError: err.message,
			}));
		}
	};

	return (
		<div className={Styles.signupWrap}>
			<Header />
			<form className={Styles.form} onSubmit={handleSubmit}>
				<h2>Adicionar Anexo</h2>

				<Input type="text" name="responsible" placeholder="Digite a nome do responsável" />
				<Input type="text" name="documentType" placeholder="Digite o tipo de documento" />
				<Input type="text" name="subject" placeholder="Digite a subject" />
				<Input type="text" name="justification" placeholder="Digite a justificativa" />
				<Input type="file" name="base64" placeholder="Escolha o arquivo" />

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
