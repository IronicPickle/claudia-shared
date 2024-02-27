import Validator from "../../../../../../../objects/Validator.ts";
import {
  RequestDetails,
  ValidatorInputs,
} from "../../../../../../../ts/api/generic.ts";
import {
  DbDiscordMember,
  WithDbId,
} from "../../../../../internal/discord/dbSpec.ts";

export interface RequestSpec extends RequestDetails {
  params: {
    userId: string;
    guildId: string;
  };
  res: {
    discordGuildMembers: WithDbId<DbDiscordMember>[];
  };
}

export const validator = ({
  userId,
  guildId,
}: ValidatorInputs<RequestSpec>) => ({
  userId: new Validator(userId).is("string").exists(),
  guildId: new Validator(guildId).is("string").exists(),
});
