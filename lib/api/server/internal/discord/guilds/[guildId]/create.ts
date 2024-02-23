import Validator from "../../../../../../objects/Validator.ts";
import {
  RequestDetails,
  ValidatorInputs,
} from "../../../../../../ts/api/generic.ts";
import { DbDiscordMember } from "../../dbSpec.ts";
import { validateMembers } from "./members/validationHelpers.ts";

export interface RequestSpec extends RequestDetails {
  params: {
    guildId: string;
  };
  body: {
    name: string;
    description: string | null | undefined;
    joinedAt: number | undefined;
    members: DbDiscordMember[];
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
  name,
  description,
  joinedAt,
  members,
}: ValidatorInputs<RequestSpec>) => ({
  guildId: new Validator(guildId).regex.isDiscordId(),
  name: new Validator(name).is("string").exists(),
  description: new Validator(description).optional().is("string"),
  joinedAt: new Validator(joinedAt).optional().is("number"),
  members: new Validator(members).is("array").exists().custom(validateMembers),
});
