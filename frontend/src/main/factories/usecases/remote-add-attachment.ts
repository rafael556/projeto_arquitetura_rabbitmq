import { makeApiUrl, makeAxiosHttpClient } from "main/factories/http";
import { AddAttachment } from "domain/usecases";
import { RemoteAddAttachment } from "data/usecases";

export const makeRemoteAddAttachment = (): AddAttachment =>
	new RemoteAddAttachment(makeApiUrl("/v1/attachment"), makeAxiosHttpClient());
