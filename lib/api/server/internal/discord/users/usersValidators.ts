import Validator from "../../../../../objects/Validator.ts";
import { ValidatorInputs } from "../../../../../ts/api/generic.ts";
import { DbDiscordPremiumTypes } from "../dbSpec.ts";
import { UserCreate, UserUpdate, UserUpsert } from "./usersSpec.ts";

const validators = {
  create: ({
    userId,
    username,
    discriminator,
    avatar,
    locale,
    premiumType,
  }: ValidatorInputs<UserCreate>) => ({
    userId: new Validator(userId).regex.isDiscordId(),

    username: new Validator(username).is("string").exists(),
    discriminator: new Validator(discriminator).is("string").exists(),
    avatar: new Validator(avatar).optional().is("string"),
    avatlocalear: new Validator(locale).optional().is("string"),
    premiumType: new Validator(premiumType)
      .optional()
      .enum.within(DbDiscordPremiumTypes),
  }),
  update: ({
    userId,
    username,
    discriminator,
    avatar,
    locale,
    premiumType,
  }: ValidatorInputs<UserUpdate>) => ({
    userId: new Validator(userId).regex.isDiscordId(),

    username: new Validator(username).optional().is("string").exists(),
    discriminator: new Validator(discriminator)
      .optional()
      .is("string")
      .exists(),
    avatar: new Validator(avatar).optional().is("string"),
    avatlocalear: new Validator(locale).optional().is("string"),
    premiumType: new Validator(premiumType)
      .optional()
      .enum.within(DbDiscordPremiumTypes),
  }),
  upsert: ({
    userId,
    username,
    discriminator,
    avatar,
    locale,
    premiumType,
  }: ValidatorInputs<UserUpsert>) => ({
    userId: new Validator(userId).regex.isDiscordId(),

    username: new Validator(username).is("string").exists(),
    discriminator: new Validator(discriminator).is("string").exists(),
    avatar: new Validator(avatar).optional().is("string"),
    avatlocalear: new Validator(locale).optional().is("string"),
    premiumType: new Validator(premiumType)
      .optional()
      .enum.within(DbDiscordPremiumTypes),
  }),
};

export default validators;
