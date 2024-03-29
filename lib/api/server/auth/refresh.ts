import Validator from "../../../objects/Validator.ts";
import {
  ApiTokens,
  RequestDetails,
  ValidatorInputs,
} from "../../../ts/api/generic.ts";

export interface RequestSpec extends RequestDetails {
  body: {
    refreshToken: string;
  };
  res: {
    tokens: ApiTokens;
  };
}

export const validator = ({ refreshToken }: ValidatorInputs<RequestSpec>) => ({
  refreshToken: new Validator(refreshToken).is("string").exists(),
});
