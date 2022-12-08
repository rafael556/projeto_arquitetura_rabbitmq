import Styles from "./table-empty-styles.module.scss";

const AttachmentTableEmpty: React.FC = () => {
	return (
		<tr className={Styles.tableEmpty}>
			<td colSpan={6}>
				<p>Nenhum anexo cadastrado.</p>
			</td>
		</tr>
	);
};

export default AttachmentTableEmpty;
