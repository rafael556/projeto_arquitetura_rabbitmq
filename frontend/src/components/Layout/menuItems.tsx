import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Link, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export const menuItems = (
	<>
		<Link color="inherit" underline="none" href="new-attachment">
			<ListItemButton>
				<ListItemIcon>
					<NoteAddIcon />
				</ListItemIcon>
				<ListItemText primary="New Attachment" />
			</ListItemButton>
		</Link>
		<Link color="inherit" underline="none" href="attachments-list">
			<ListItemButton>
				<ListItemIcon>
					<LibraryBooksIcon />
				</ListItemIcon>
				<ListItemText primary="Attachments List" />
			</ListItemButton>
		</Link>
	</>
);
