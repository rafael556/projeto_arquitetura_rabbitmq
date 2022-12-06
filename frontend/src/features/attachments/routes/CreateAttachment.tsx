import { Box, Grid, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { useCreateAttachment } from "../api/createAttachment";

import { AttachmentCreateRequest } from "../types";

const schema = z.object({
	responsible: z.string().min(1, "Required"),
	date: z.string().min(1, "Required"),
	documentType: z.string().min(1, "Required"),
	subject: z.string().min(1, "Required"),
	justification: z.string().min(1, "Required"),
	base64: z.string().min(1, "Required"),
});

export function CreateAttachment() {
	const createAttachmentMutation = useCreateAttachment();

	const { register, formState, handleSubmit } = useForm<AttachmentCreateRequest>({ resolver: zodResolver(schema) });

	const onSubmit: SubmitHandler<AttachmentCreateRequest> = async values => {
		await createAttachmentMutation.mutateAsync(values);
	};

	return (
		<Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						autoFocus
						id="responsible"
						label="Responsible"
						error={!!formState.errors["responsible"]}
						{...register("responsible")}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						id="date"
						label="Date"
						error={!!formState.errors["date"]}
						{...register("date")}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						id="documentType"
						label="Document Type"
						error={!!formState.errors["documentType"]}
						{...register("documentType")}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						id="subject"
						label="Subject"
						error={!!formState.errors["subject"]}
						{...register("subject")}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						id="justification"
						label="Justification"
						error={!!formState.errors["justification"]}
						{...register("justification")}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						id="base64"
						label="Attachment"
						error={!!formState.errors["base64"]}
						{...register("base64")}
					/>
				</Grid>
			</Grid>
			<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
				Create Attachment
			</Button>
			<Grid container justifyContent="flex-end">
				<Grid item>
					<Link to="/attachment/all">Cancel</Link>
				</Grid>
			</Grid>
		</Box>
	);
}
