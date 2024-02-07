import { RequestDetails } from "../../../../ts/api/generic.ts";
import { DbUser } from "../../internal/discord/dbSpec.ts";
import { DbDiscordUser, WithDbId } from "../../internal/discord/dbSpec.ts";

export interface RequestSpec extends RequestDetails {
  res: {
    user: WithDbId<DbUser>;
    discordUser: WithDbId<DbDiscordUser>;
  };
}
