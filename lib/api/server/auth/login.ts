import Validator from "../../../objects/Validator.ts";
import { RequestDetails, ValidatorInputs } from "../../../ts/api/generic.ts";

export interface RequestSpec extends RequestDetails {
  body: {
    code: string;
    state: string;
    redirectUri: string;
  };
  res: {};
}

export const validator = ({ code, state }: ValidatorInputs<RequestSpec>) => ({
  code: new Validator(code).is("string").exists(),
  state: new Validator(state).is("string").exists(),
});
