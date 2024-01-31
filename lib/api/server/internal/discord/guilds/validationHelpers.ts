import { DbDiscordGuild } from "../dbSpec.ts";
import { validator as guildsUpsertValidator } from "./{guildId}/upsert.ts";

export const validateGuildsUpsert = (guilds: DbDiscordGuild[]) => {
  for (const guildIndex in guilds) {
    const guild = guilds[parseInt(guildIndex)];

    const failedGuildValidation = Object.entries(
      guildsUpsertValidator(guild)
    ).find(([_, validation]) => validation.getFailed());

    if (failedGuildValidation) {
      const [key, validator] = failedGuildValidation;
      const [error] = validator.getErrors();
      return `Error at guilds[${guildIndex}].${key} - ${error}`;
    }
  }
};
