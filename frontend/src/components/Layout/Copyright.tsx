import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function Copyright(props: any) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{"Copyright © "}
			<Link color="inherit" to="https://github.com/RenatoMoratto">
				Renato
			</Link>
			{", "}
			<Link color="inherit" to="https://github.com/Marllock">
				Marcelo
			</Link>
			{" e "}
			<Link color="inherit" to="https://github.com/rafael556">
				Rafael
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
