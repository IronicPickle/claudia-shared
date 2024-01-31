import {
  RequestDetails,
  ValidatorInputs,
} from "../../../../../../ts/api/generic.ts";
import Validator from "../../../../../../objects/Validator.ts";

export interface RequestSpec extends RequestDetails {
  params: {
    guildId: string;
  };
  body: {
    active?: boolean;
    name?: string;
    description?: string | null | undefined;
    joinedAt?: number | undefined;
  };
  res: {
    guildId: string;
    name: string;
    description: string | null | undefined;
    joinedAt: number | undefined;
  };
}

export const validator = ({
  guildId,
  active,
  name,
  description,
  joinedAt,
}: ValidatorInputs<RequestSpec>) => ({
  guildId: new Validator(guildId).regex.isDiscordId(),
  active: new Validator(active).optional().is("boolean").exists(),
  name: new Validator(name).optional().is("string").exists(),
  description: new Validator(description).optional().is("string"),
  joinedAt: new Validator(joinedAt).optional().is("number"),
});
