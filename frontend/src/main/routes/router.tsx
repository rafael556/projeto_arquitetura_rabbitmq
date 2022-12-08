import { MakeAttachmentList, MakeNewAttachment } from "main/factories/pages";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/attachments" element={<MakeAttachmentList />} />
				<Route path="/new-attachment" element={<MakeNewAttachment />} />
				<Route path="*" element={<Navigate to="/attachments" />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
