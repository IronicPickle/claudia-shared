import { RequestDetails, ValidatorInputs } from "../../../../ts/api/generic.ts";

export interface RequestSpec extends RequestDetails {
  body: {};
  res: {};
}

export const validator = ({}: ValidatorInputs<RequestSpec>) => ({});
