import React from "react";

import "presentation/styles/global.scss";

import { Router } from "main/routes";
import ReactDOM from "react-dom/client";

const main = ReactDOM.createRoot(document.getElementById("main") as HTMLElement);
main.render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>
);
