import Styles from "./table-empty-styles.module.scss";

const AttachmentTableEmpty: React.FC = () => {
	return (
		<tr className={Styles.tableEmpty}>
			<p>Nenhum anexo cadastrado.</p>
		</tr>
	);
};

export default AttachmentTableEmpty;
