import Styles from "./attachment-list-styles.module.scss";

import { LoadAttachmentList } from "@/domain/usecases";
import { Header, Footer, Error } from "@/presentation/components";
import { attachmentListState, AttachmentTable } from "@/presentation/pages/attachment-list/components";

import { useState, useEffect } from "react";

type Props = {
	loadAttachmentList: LoadAttachmentList;
};

const AttachmentList: React.FC<Props> = ({ loadAttachmentList }: Props) => {
	const [state, setState] = useState(attachmentListState);

	const handleError = (error: Error) => {
		setState(old => ({ ...old, error: error.message }));
	};

	const reload = (): void => setState(old => ({ attachments: [], error: "", reload: !old.reload }));

	useEffect(() => {
		loadAttachmentList
			.loadAll()
			.then(attachments => setState(old => ({ ...old, attachments })))
			.catch(handleError);
	}, [loadAttachmentList, state.reload]);

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
