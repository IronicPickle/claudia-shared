import Validator from "../../../objects/Validator.ts";
import { ApiTokens } from "../../../ts/api/generic.ts";
import { RequestDetails, ValidatorInputs } from "../../../ts/api/generic.ts";
import { DbUser } from "../internal/discord/dbSpec.ts";
import { DbDiscordUser, WithDbId } from "../internal/discord/dbSpec.ts";

export interface RequestSpec extends RequestDetails {
  body: {
    code: string;
    state: string;
    redirectUri: string;
  };
  res: {
    tokens: ApiTokens;
    user: WithDbId<DbUser>;
    discordUser: WithDbId<DbDiscordUser>;
  };
}

export const validator = ({
  code,
  state,
  redirectUri,
}: ValidatorInputs<RequestSpec>) => ({
  code: new Validator(code).is("string").exists(),
  state: new Validator(state).is("string").exists(),
  redirectUri: new Validator(redirectUri).is("string").exists(),
});
