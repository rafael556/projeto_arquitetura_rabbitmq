import Styles from "./item-styles.module.scss";
import { LoadAttachmentList } from "@/domain/usecases";

import React from "react";

type Props = {
	attachment: LoadAttachmentList.Model;
};

const AttachmentTableRow: React.FC<Props> = ({ attachment }: Props) => {
	return (
		<tr className={Styles.attachmentTableRow}>
			<td>{attachment.responsible}</td>
			<td>{new Date(attachment.date).toLocaleDateString("pt-BR")}</td>
			<td>{attachment.documentType}</td>
			<td>{attachment.justification}</td>
			<td>{attachment.subject}</td>
			<td>
				<a href={attachment.fileUrl}>Link do arquivo</a>
			</td>
		</tr>
	);
};

export default AttachmentTableRow;
