import { HttpClient, HttpStatusCode } from "data/protocols/http";
import { AddAttachment } from "domain/usecases";
import { UnexpectedError } from "domain/errors";

export class RemoteAddAttachment implements AddAttachment {
	constructor(private readonly url: string, private readonly httpClient: HttpClient<RemoteAddAttachment.Model>) {}

	async add(params: AddAttachment.Params): Promise<AddAttachment.Model> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: "post",
			body: params,
		});
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body!;
			default:
				throw new UnexpectedError();
		}
	}
}

export namespace RemoteAddAttachment {
	export type Model = AddAttachment.Model;
}
