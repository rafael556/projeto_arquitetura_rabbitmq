import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { AttachmentModel } from "@/domain/models";
import { LoadAttachmentList } from "@/domain/usecases";

export class RemoteLoadAttachmentList implements LoadAttachmentList {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<RemoteLoadAttachmentList.Model[]>
	) {}

	async loadAll(): Promise<LoadAttachmentList.Model[]> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: "get",
		});
		const remoteAttachments = httpResponse.body || [];
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return remoteAttachments;
			case HttpStatusCode.noContent:
				return [];
			default:
				throw new UnexpectedError();
		}
	}
}

export namespace RemoteLoadAttachmentList {
	export type Model = AttachmentModel;
}
