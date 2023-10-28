export interface GuildCreate {
  body: {
    guildId: string;
    name: string;
    description: string | null | undefined;
    joinedAt: number | undefined;
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
    guilds: Array<{
      guildId: string;
      active: boolean;
      name: string;
      description: string | null | undefined;
      joinedAt: number | undefined;
    }>;
  };
  res: {};
}
