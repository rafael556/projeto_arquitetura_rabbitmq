import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CircularProgress, createTheme, CssBaseline, Grid, Typography, Button } from "@mui/material";

import { queryClient } from "../lib/react-query";

const ErrorFallback = () => {
	return (
		<Grid
			container
			spacing={0}
			display="flex"
			direction="column"
			justifyContent="center"
			alignItems="center"
			style={{ minHeight: "90vh" }}
		>
			<Grid item xs={2}>
				<Typography variant="h3" gutterBottom>
					Ooops, something went wrong :(
				</Typography>
			</Grid>
			<Grid item xs={1}>
				<Button variant="contained" onClick={() => window.location.assign(window.location.origin)}>
					Refresh
				</Button>
			</Grid>
		</Grid>
	);
};

type AppProviderProps = {
	children: React.ReactNode;
};

const mdTheme = createTheme();

export const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<React.Suspense
			fallback={
				<Grid display="flex" justifyContent="center" alignItems="center">
					<CircularProgress size="lg" />
				</Grid>
			}
		>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<ThemeProvider theme={mdTheme}>
					<QueryClientProvider client={queryClient}>
						<CssBaseline />
						<Router>{children}</Router>
					</QueryClientProvider>
				</ThemeProvider>
			</ErrorBoundary>
		</React.Suspense>
	);
};
