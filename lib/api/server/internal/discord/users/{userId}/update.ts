import Validator from "../../../../../../objects/Validator.ts";
import {
  RequestDetails,
  ValidatorInputs,
} from "../../../../../../ts/api/generic.ts";
import { DbDiscordPremiumTypes } from "../../dbSpec.ts";

export interface RequestSpec extends RequestDetails {
  params: {
    userId: string;
  };
  body: {
    username?: string;
    discriminator?: string;
    avatar?: string | undefined;
    locale?: string | undefined;
    premiumType?: DbDiscordPremiumTypes | undefined;
  };
  res: {
    userId: string;
    username: string;
    discriminator: string;
    avatar: string | undefined;
    locale: string | undefined;
    premiumType: DbDiscordPremiumTypes | undefined;
  };
}

export const validator = ({
  userId,
  username,
  discriminator,
  avatar,
  locale,
  premiumType,
}: ValidatorInputs<RequestSpec>) => ({
  userId: new Validator(userId).regex.isDiscordId(),

  username: new Validator(username).optional().is("string").exists(),
  discriminator: new Validator(discriminator).optional().is("string").exists(),
  avatar: new Validator(avatar).optional().is("string"),
  avatlocalear: new Validator(locale).optional().is("string"),
  premiumType: new Validator(premiumType)
    .optional()
    .enum.within(DbDiscordPremiumTypes),
});
