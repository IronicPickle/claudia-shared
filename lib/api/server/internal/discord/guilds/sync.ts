import Validator from "../../../../../objects/Validator.ts";
import {
  RequestDetails,
  ValidatorInputs,
} from "../../../../../ts/api/generic.ts";
import { DbDiscordGuild } from "../dbSpec.ts";
import { validateGuildsUpsert } from "./validationHelpers.ts";

export interface RequestSpec extends RequestDetails {
  body: {
    guilds: DbDiscordGuild[];
  };
  res: { upsertedCount: number; modifiedCount: number };
}

export const validator = ({ guilds }: ValidatorInputs<RequestSpec>) => ({
  guilds: new Validator(guilds)
    .is("array")
    .exists()
    .custom(validateGuildsUpsert),
});
