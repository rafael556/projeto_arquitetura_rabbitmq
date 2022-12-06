import { useQuery } from "react-query";

import { axios } from "../../../lib/axios";
import { QueryConfig, ExtractFnReturnType } from "../../../lib/react-query";

import { AttachmentResponse } from "../types";

export const getAttachments = (): Promise<AttachmentResponse[]> => {
	return axios.get("/attachments");
};

type QueryFnType = typeof getAttachments;

type UseAttachmentsOptions = {
	config?: QueryConfig<QueryFnType>;
};

export const useAttachments = ({ config }: UseAttachmentsOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryKey: ["attachments"],
		queryFn: () => getAttachments(),
	});
};
