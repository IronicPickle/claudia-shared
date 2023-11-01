import Validator from "../../../../../../objects/Validator.ts";
import { ValidatorInputs } from "../../../../../../ts/api/generic.ts";
import { DbDiscordUser } from "../../dbSpec.ts";
import usersValidators from "../../users/usersValidators.ts";
import {
  GuildMemberCreate,
  GuildMemberUpdate,
  GuildMemberUpsert,
} from "./membersSpec.ts";

const validateUserUpsert = (user: DbDiscordUser) => {
  const failedUserValidation = Object.entries(
    usersValidators.upsert(user ?? {})
  ).find(([_, validation]) => validation.getFailed());

  if (failedUserValidation) {
    const [key, validator] = failedUserValidation;
    const [error] = validator.getErrors();
    return `Error at member.user.${key} - ${error}`;
  }
};

const validators = {
  create: ({
    guildId,
    memberId,

    avatar,
    joinedAt,
    nick,
    permissions,
    roles,
    communicationDisabledUntil,
    premiumSince,

    user,
  }: ValidatorInputs<GuildMemberCreate>) => ({
    guildId: new Validator(guildId).regex.isDiscordId(),
    memberId: new Validator(memberId).regex.isDiscordId(),

    avatar: new Validator(avatar).optional().is("string"),
    joinedAt: new Validator(joinedAt).is("number").exists(),
    nick: new Validator(nick).optional().is("string"),
    permissions: new Validator(permissions).optional().is("string"),
    roles: new Validator(roles).is("array").array.contains("string"),
    communicationDisabledUntil: new Validator(communicationDisabledUntil)
      .optional()
      .is("number"),
    premiumSince: new Validator(premiumSince).optional().is("number"),

    user: new Validator(user)
      .optional()
      .is("object")
      .custom(validateUserUpsert),
  }),
  update: ({
    guildId,
    memberId,

    active,
    avatar,
    joinedAt,
    nick,
    permissions,
    roles,
    communicationDisabledUntil,
    premiumSince,

    user,
  }: ValidatorInputs<GuildMemberUpdate>) => ({
    guildId: new Validator(guildId).optional().regex.isDiscordId(),
    memberId: new Validator(memberId).optional().regex.isDiscordId(),

    active: new Validator(active).optional().is("boolean").exists(),
    avatar: new Validator(avatar).optional().is("string"),
    joinedAt: new Validator(joinedAt).optional().is("number").exists(),
    nick: new Validator(nick).optional().is("string"),
    permissions: new Validator(permissions).optional().is("string"),
    roles: new Validator(roles).optional().is("array").array.contains("string"),
    communicationDisabledUntil: new Validator(communicationDisabledUntil)
      .optional()
      .is("number"),
    premiumSince: new Validator(premiumSince).optional().is("number"),

    user: new Validator(user)
      .optional()
      .is("object")
      .custom(validateUserUpsert),
  }),
  upsert: ({
    guildId,
    memberId,

    active,
    avatar,
    joinedAt,
    nick,
    permissions,
    roles,
    communicationDisabledUntil,
    premiumSince,

    user,
  }: ValidatorInputs<GuildMemberUpsert>) => ({
    guildId: new Validator(guildId).regex.isDiscordId(),
    memberId: new Validator(memberId).regex.isDiscordId(),

    active: new Validator(active).is("boolean").exists(),
    avatar: new Validator(avatar).optional().is("string"),
    joinedAt: new Validator(joinedAt).is("number").exists(),
    nick: new Validator(nick).optional().is("string"),
    permissions: new Validator(permissions).optional().is("string"),
    roles: new Validator(roles).is("array").array.contains("string"),
    communicationDisabledUntil: new Validator(communicationDisabledUntil)
      .optional()
      .is("number"),
    premiumSince: new Validator(premiumSince).optional().is("number"),

    user: new Validator(user)
      .optional()
      .is("object")
      .custom(validateUserUpsert),
  }),
};

export default validators;
