import Validator from "../../../../../objects/Validator.ts";
import {
  RequestDetails,
  ValidatorInputs,
} from "../../../../../ts/api/generic.ts";
import { DbDiscordGuild, WithDbId } from "../../../internal/discord/dbSpec.ts";

export interface RequestSpec extends RequestDetails {
  params: {
    userId: string;
  };
  res: {
    discordGuilds: WithDbId<DbDiscordGuild>[];
  };
}

export const validator = ({ userId }: ValidatorInputs<RequestSpec>) => ({
  userId: new Validator(userId).is("string").exists(),
});
