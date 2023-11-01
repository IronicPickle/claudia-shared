import Validator from "../../../../../objects/Validator.ts";
import { ValidatorInputs } from "../../../../../ts/api/generic.ts";
import { DbDiscordGuild, DbDiscordMember } from "../dbSpec.ts";
import {
  GuildCreate,
  GuildUpdate,
  GuildUpsert,
  GuildsSync,
} from "./guildsSpec.ts";
import membersValidators from "./members/membersValidators.ts";

const validateGuildsUpsert = (guilds: DbDiscordGuild[]) => {
  for (const guildIndex in guilds) {
    const guild = guilds[parseInt(guildIndex)];

    const failedGuildValidation = Object.entries(validators.upsert(guild)).find(
      ([_, validation]) => validation.getFailed()
    );

    if (failedGuildValidation) {
      const [key, validator] = failedGuildValidation;
      const [error] = validator.getErrors();
      return `Error at guilds[${guildIndex}].${key} - ${error}`;
    }
  }
};

const validateMembers = (members: DbDiscordMember[]) => {
  for (const memberIndex in members) {
    const member = members[parseInt(memberIndex)];

    const failedMemberValidation = Object.entries(
      membersValidators.upsert(member)
    ).find(([_, validation]) => validation.getFailed());

    if (failedMemberValidation) {
      const [key, validator] = failedMemberValidation;
      const [error] = validator.getErrors();
      return `Error at guild.members[${memberIndex}].${key} - ${error}`;
    }
  }
};

const validators = {
  create: ({
    guildId,
    name,
    description,
    joinedAt,
    members,
  }: ValidatorInputs<GuildCreate>) => ({
    guildId: new Validator(guildId).regex.isDiscordId(),
    name: new Validator(name).is("string").exists(),
    description: new Validator(description).optional().is("string"),
    joinedAt: new Validator(joinedAt).optional().is("number"),
    members: new Validator(members)
      .is("array")
      .exists()
      .custom(validateMembers),
  }),
  update: ({
    guildId,
    active,
    name,
    description,
    joinedAt,
  }: ValidatorInputs<GuildUpdate>) => ({
    guildId: new Validator(guildId).regex.isDiscordId(),
    active: new Validator(active).optional().is("boolean").exists(),
    name: new Validator(name).optional().is("string").exists(),
    description: new Validator(description).optional().is("string"),
    joinedAt: new Validator(joinedAt).optional().is("number"),
  }),
  upsert: ({
    guildId,
    active,
    name,
    description,
    joinedAt,
    members,
  }: ValidatorInputs<GuildUpsert>) => ({
    guildId: new Validator(guildId).regex.isDiscordId(),
    active: new Validator(active).is("boolean").exists(),
    name: new Validator(name).is("string").exists(),
    description: new Validator(description).optional().is("string"),
    joinedAt: new Validator(joinedAt).optional().is("number"),
    members: new Validator(members)
      .is("array")
      .exists()
      .custom(validateMembers),
  }),
  sync: ({ guilds }: ValidatorInputs<GuildsSync>) => ({
    guilds: new Validator(guilds)
      .is("array")
      .exists()
      .custom(validateGuildsUpsert),
  }),
};

export default validators;
