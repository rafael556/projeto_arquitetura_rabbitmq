import { Navigate, Route, Routes } from "react-router-dom";

import { CreateAttachment } from "./CreateAttachment";
import { AttachmentsList } from "./AttachmentsList";

export const AttachmentRoutes = () => {
	return (
		<Routes>
			<Route path="all" element={<AttachmentsList />} />
			<Route path="new" element={<CreateAttachment />} />
			<Route path="*" element={<Navigate to="." />} />
		</Routes>
	);
};
