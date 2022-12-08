import { makeApiUrl, makeAxiosHttpClient } from "main/factories/http";
import { LoadAttachmentList } from "domain/usecases";
import { RemoteLoadAttachmentList } from "data/usecases";

export const makeRemoteLoadAttachmentList = (): LoadAttachmentList =>
	new RemoteLoadAttachmentList(makeApiUrl("/v1/attachment"), makeAxiosHttpClient());
