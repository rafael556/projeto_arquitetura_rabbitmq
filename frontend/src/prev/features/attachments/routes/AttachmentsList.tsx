import { Title } from "../../../components/Elements/Title";
import { CircularProgress, Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Link } from "react-router-dom";
import { useAttachments } from "../api/getAttachments";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

export function AttachmentsList() {
	const attachmentsQuery = useAttachments({});

	if (attachmentsQuery.isLoading) {
		return (
			<Grid xs display="flex" justifyContent="center" alignItems="center">
				<CircularProgress size="lg" />
			</Grid>
		);
	}

	if (!attachmentsQuery?.data?.length) {
		return (
			<Grid xs display="flex" justifyContent="center" alignItems="center">
				<Inventory2OutlinedIcon />
				<Typography component="p" variant="h4">
					No Attachments Found
				</Typography>
			</Grid>
		);
	}

	return (
		<>
			<Title>Attachments</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Responsible</TableCell>
						<TableCell>Date</TableCell>
						<TableCell>Document Type</TableCell>
						<TableCell>Subject</TableCell>
						<TableCell>Justification</TableCell>
						<TableCell>File URL</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{attachmentsQuery.data.map(attachment => (
						<TableRow key={attachment.id}>
							<TableCell>{attachment.responsible}</TableCell>
							<TableCell>{attachment.date}</TableCell>
							<TableCell>{attachment.documentType}</TableCell>
							<TableCell>{attachment.subject}</TableCell>
							<TableCell>{attachment.justification}</TableCell>
							<TableCell>
								<Link color="inherit" to={attachment.fileUrl}>
									{attachment.fileUrl}
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
