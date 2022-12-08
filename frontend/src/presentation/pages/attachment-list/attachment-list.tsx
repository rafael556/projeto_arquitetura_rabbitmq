import Styles from "./attachment-list-styles.module.scss";

import { LoadAttachmentList } from "domain/usecases";
import { Header, Footer, Error } from "presentation/components";
import { AttachmentTable, attachmentListState } from "presentation/pages/attachment-list/components";

import { useRecoilState, useResetRecoilState } from "recoil";
import React, { useCallback, useEffect } from "react";

type Props = {
	loadAttachmentList: LoadAttachmentList;
};

const AttachmentList: React.FC<Props> = ({ loadAttachmentList }: Props) => {
	const resetAttachmentListState = useResetRecoilState(attachmentListState);

	const [state, setState] = useRecoilState(attachmentListState);

	const handleError = useCallback(
		(error: Error) => {
			setState(old => ({ ...old, error: error.message }));
		},
		[setState]
	);

	const reload = (): void => setState(old => ({ attachments: [], error: "", reload: !old.reload }));

	useEffect(() => resetAttachmentListState(), [resetAttachmentListState]);

	useEffect(() => {
		loadAttachmentList
			.loadAll()
			.then(attachments => setState(old => ({ ...old, attachments })))
			.catch(handleError);
	}, [handleError, loadAttachmentList, setState, state.reload]);

	return (
		<div className={Styles.attachmentListWrap}>
			<Header />
			<div className={Styles.contentWrap}>
				<h2>Anexos</h2>
				{state.error ? (
					<Error error={state.error} reload={reload} />
				) : (
					<AttachmentTable attachments={state.attachments} />
				)}
			</div>
			<Footer />
		</div>
	);
};

export default AttachmentList;
