import Validator from "../../../../../objects/Validator.ts";
import { ValidatorInputs } from "../../../../../ts/api/generic.ts";
import {
  GuildCreate,
  GuildUpdate,
  GuildUpsert,
  GuildsSync,
} from "../../../../../ts/api/server/internal/discord/guilds.ts";

const validators = {
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
  sync: ({ guilds }: ValidatorInputs<GuildsSync>) => ({
    guilds: new Validator(guilds)
      .is("array")
      .exists()
      .custom((guilds: Partial<GuildUpsert["body"]>[]) => {
        for (const i in guilds) {
          const guild = guilds[i];
          for (const [key, validator] of Object.entries(
            validators.upsert(guild)
          )) {
            if (validator.getFailed()) {
              const [error] = validator.getErrors();
              return `Index ${i} : Key ${key}- ${error}`;
            }
          }
        }
      }),
  }),
};

export default validators;
