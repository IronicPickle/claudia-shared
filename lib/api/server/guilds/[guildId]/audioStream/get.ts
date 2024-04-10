import Validator from "../../../../../objects/Validator.ts";
import {
  RequestDetails,
  ValidatorInputs,
} from "../../../../../ts/api/generic.ts";

export interface RequestSpec extends RequestDetails {
  params: {
    guildId: string;
  };
  res: {};
}

export const validator = ({ guildId }: ValidatorInputs<RequestSpec>) => ({
  guildId: new Validator(guildId).is("string").exists(),
});
