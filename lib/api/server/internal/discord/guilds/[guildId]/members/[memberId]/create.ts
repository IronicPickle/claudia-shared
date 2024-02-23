import Validator from "../../../../../../../../objects/Validator.ts";
import {
  RequestDetails,
  ValidatorInputs,
} from "../../../../../../../../ts/api/generic.ts";
import { DbDiscordUser } from "../../../../dbSpec.ts";
import { validateUserUpsert } from "../validationHelpers.ts";

export interface RequestSpec extends RequestDetails {
  params: {
    guildId: string;
    memberId: string;
  };
  body: {
    avatar: string | undefined;
    joinedAt: number;
    nick: string | undefined;
    permissions: string | undefined;
    roles: string[];
    communicationDisabledUntil: number | undefined;
    premiumSince: number | undefined;
    user: DbDiscordUser | undefined;
  };
  res: {
    guildId: string;
    memberId: string;
    userId: string;
    avatar: string | undefined;
    joinedAt: number;
    nick: string | undefined;
    permissions: string | undefined;
    roles: string[];
    communicationDisabledUntil: number | undefined;
    premiumSince: number | undefined;
    user: DbDiscordUser | undefined;
  };
}

export const validator = ({
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
}: ValidatorInputs<RequestSpec>) => ({
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

  user: new Validator(user).optional().is("object").custom(validateUserUpsert),
});
