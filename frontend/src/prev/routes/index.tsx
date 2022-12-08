import { Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";

import { lazyImport } from "../utils/lazyImport";
import { MainLayout } from "../components/Layout";

const { AttachmentRoutes } = lazyImport(() => import("../features/attachments"), "AttachmentRoutes");

const App = () => {
	return (
		<MainLayout>
			<Suspense
				fallback={
					<Grid display="flex" justifyContent="center" alignItems="center">
						<CircularProgress size="lg" />
					</Grid>
				}
			>
				<Outlet />
			</Suspense>
		</MainLayout>
	);
};

const routes = [
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "attachments/*", element: <AttachmentRoutes /> },
			{ path: "*", element: <Navigate to="." /> },
		],
	},
];

export const AppRoutes = () => {
	const element = useRoutes([...routes]);

	return <>{element}</>;
};
