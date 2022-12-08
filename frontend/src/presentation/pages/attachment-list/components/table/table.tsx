import Styles from "./table-styles.module.scss";
import { LoadAttachmentList } from "domain/usecases";
import { AttachmentTableEmpty, AttachmentTableRow } from "presentation/pages/attachment-list/components";

type Props = {
	attachments: LoadAttachmentList.Model[];
};

const AttachmentTable: React.FC<Props> = ({ attachments }: Props) => {
	return (
		<table className={Styles.tableWrap}>
			<thead>
				<tr>
					<th>Responsável</th>
					<th>Data</th>
					<th>Tipo do documento</th>
					<th>Justficativa</th>
					<th>Assunto</th>
					<th>Link do arquivo</th>
				</tr>
			</thead>
			<tbody>
				{attachments.length ? (
					attachments.map((attachment: LoadAttachmentList.Model) => (
						<AttachmentTableRow key={attachment.id} attachment={attachment} />
					))
				) : (
					<AttachmentTableEmpty />
				)}
			</tbody>
		</table>
	);
};

export default AttachmentTable;
