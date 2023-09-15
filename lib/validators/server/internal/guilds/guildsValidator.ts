import Validator from "../../../../objects/Validator.ts";
import { ValidatorInputs } from "../../../../ts/api/generic.ts";
import {
  GuildCreate,
  GuildUpdate,
  GuildUpsert,
} from "../../../../ts/api/server/internal/guilds/guilds.ts";

export default {
  create: ({
    guildId,
    name,
    description,
    joinedAt,
  }: ValidatorInputs<GuildCreate>) => ({
    guildId: new Validator(guildId).is("string").exists(),
    name: new Validator(name).is("string").exists(),
    description: new Validator(description)
      .skipIf(description == null)
      .is("string"),
    joinedAt: new Validator(joinedAt).skipIf(joinedAt == null).is("number"),
  }),
  update: ({
    guildId,
    active,
    name,
    description,
    joinedAt,
  }: ValidatorInputs<GuildUpdate>) => ({
    guildId: new Validator(guildId).is("string").exists(),
    active: new Validator(active)
      .skipIf(joinedAt == null)
      .is("boolean")
      .exists(),
    name: new Validator(name)
      .skipIf(joinedAt == null)
      .is("string")
      .exists(),
    description: new Validator(description)
      .skipIf(description == null)
      .is("string"),
    joinedAt: new Validator(joinedAt).skipIf(joinedAt == null).is("number"),
  }),
  upsert: ({
    guildId,
    active,
    name,
    description,
    joinedAt,
  }: ValidatorInputs<GuildUpsert>) => ({
    guildId: new Validator(guildId).is("string").exists(),
    active: new Validator(active).is("boolean").exists(),
    name: new Validator(name).is("string").exists(),
    description: new Validator(description)
      .skipIf(description == null)
      .is("string"),
    joinedAt: new Validator(joinedAt).skipIf(joinedAt == null).is("number"),
  }),
};
