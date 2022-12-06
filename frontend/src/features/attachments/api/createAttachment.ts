import { useMutation } from "react-query";

import { axios } from "../../../lib/axios";
import { MutationConfig, queryClient } from "../../../lib/react-query";

import { AttachmentCreateRequest, Attachment } from "../types";

export const createAttachment = (data: AttachmentCreateRequest): Promise<Attachment> => {
	return axios.post(`/attachments`, { data });
};

type UseCreateAttachmentOptions = {
	config?: MutationConfig<typeof createAttachment>;
};

export const useCreateAttachment = ({ config }: UseCreateAttachmentOptions = {}) => {
	return useMutation({
		onMutate: async newAttachment => {
			await queryClient.cancelQueries("attachments");

			const previousAttachments = queryClient.getQueryData<Attachment[]>("attachments");

			queryClient.setQueryData("attachments", [...(previousAttachments || []), newAttachment]);

			return { previousAttachments };
		},
		onError: (_, __, context: any) => {
			if (context?.previousAttachments) {
				queryClient.setQueryData("attachments", context.previousAttachments);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries("attachments");
		},
		...config,
		mutationFn: createAttachment,
	});
};
