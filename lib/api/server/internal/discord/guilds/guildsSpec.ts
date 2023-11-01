import { DbDiscordGuild, DbDiscordMember } from "../dbSpec.ts";

export interface GuildCreate {
  params: {
    guildId: string;
  };
  body: {
    name: string;
    description: string | null | undefined;
    joinedAt: number | undefined;
    members: DbDiscordMember[];
  };
  res: {
    guildId: string;
    name: string;
    description: string | null | undefined;
    joinedAt: number | undefined;
  };
}

export interface GuildUpdate {
  params: {
    guildId: string;
  };
  body: {
    active?: boolean;
    name?: string;
    description?: string | null | undefined;
    joinedAt?: number | undefined;
  };
  res: {
    guildId: string;
    name: string;
    description: string | null | undefined;
    joinedAt: number | undefined;
  };
}

export interface GuildUpsert {
  params: {
    guildId: string;
  };
  body: {
    active: boolean;
    name: string;
    description: string | null | undefined;
    joinedAt: number | undefined;
    members: DbDiscordMember[];
  };
  res: {
    guildId: string;
    name: string;
    description: string | null | undefined;
    joinedAt: number | undefined;
  };
}

export interface GuildsSync {
  body: {
    guilds: DbDiscordGuild[];
  };
  res: { upsertedCount: number; modifiedCount: number };
}
