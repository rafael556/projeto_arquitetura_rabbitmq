import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Toolbar, IconButton, Typography, Divider, List, Container } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { Copyright } from "./Copyright";
import { useDisclosure } from "../../hooks/useDisclosure";

import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Link, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const drawerWidth: number = 240;

interface MainLayoutProps {
	children: React.ReactNode;
}

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== "open" })(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

interface MenuItem {
	link: string;
	title: string;
	icon: JSX.Element;
}

export const menuItems: MenuItem[] = [
	{ link: "/attachments/new", title: "New Attachment", icon: <NoteAddIcon /> },
	{ link: "/attachments/all", title: "Attachments List", icon: <LibraryBooksIcon /> },
];

export function MainLayout({ children }: MainLayoutProps) {
	const { isOpen, toggle } = useDisclosure(true);

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar position="absolute" open={isOpen}>
				<Toolbar sx={{ pr: "24px" }}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={toggle}
						sx={{
							marginRight: "36px",
							...(isOpen && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
						App
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={isOpen}>
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						px: [1],
					}}
				>
					<IconButton onClick={toggle}>
						<ChevronLeftIcon />
					</IconButton>
				</Toolbar>
				<Divider />
				<List component="nav">
					{menuItems.map(item => (
						<Link color="inherit" underline="none" href={item.link}>
							<ListItemButton>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.title} />
							</ListItemButton>
						</Link>
					))}
				</List>
			</Drawer>
			<Box
				component="main"
				sx={{
					backgroundColor: theme => theme.palette.grey[100],
					flexGrow: 1,
					height: "100vh",
					overflow: "auto",
				}}
			>
				<Toolbar />
				<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
					{children}
					<Copyright sx={{ pt: 4 }} />
				</Container>
			</Box>
		</Box>
	);
}
