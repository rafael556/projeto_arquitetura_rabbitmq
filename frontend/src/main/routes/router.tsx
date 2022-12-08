import { MakeAttachmentList, MakeNewAttachment } from "main/factories/pages";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { RecoilRoot } from "recoil";

const Router: React.FC = () => {
	return (
		<RecoilRoot>
			<BrowserRouter>
				<Routes>
					<Route path="/attachments" element={<MakeAttachmentList />} />
					<Route path="/new-attachment" element={<MakeNewAttachment />} />
					<Route path="*" element={<Navigate to="/attachments" />} />
				</Routes>
			</BrowserRouter>
		</RecoilRoot>
	);
};

export default Router;
