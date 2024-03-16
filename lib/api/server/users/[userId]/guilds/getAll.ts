import Validator from "../../../../../objects/Validator.ts";
import {
  RequestDetails,
  ValidatorInputs,
} from "../../../../../ts/api/generic.ts";
import { WithoutMembers } from "@shared/lib/api/server/internal/discord/dbSpec.ts";
import { DbDiscordGuild, WithDbId } from "../../../internal/discord/dbSpec.ts";

export interface RequestSpec extends RequestDetails {
  params: {
    userId: string;
  };
  res: {
    discordGuilds: WithoutMembers<WithDbId<DbDiscordGuild>>[];
  };
}

export const validator = ({ userId }: ValidatorInputs<RequestSpec>) => ({
  userId: new Validator(userId).is("string").exists(),
});
