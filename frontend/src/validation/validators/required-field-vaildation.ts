import { FieldValidation } from "validation/protocols";
import { RequiredFieldError } from "validation/errors";

export class RequiredFieldValidation implements FieldValidation {
	constructor(readonly field: string) {}

	validate(input: object): Error | null {
		return input[this.field as keyof object] ? null : new RequiredFieldError();
	}
}
