export enum DbDiscordPremiumTypes {
  None,
  NitroClassic,
  Nitro,
  NitroBasic,
}

export interface DbDiscordGuild {
  guildId: string;
  name: string;
  description: string | null | undefined;
  active: boolean;
  joinedAt: number | undefined;
  members: DbDiscordMember[];
}

export interface DbDiscordMember {
  memberId: string;
  guildId: string;
  avatar: string | undefined;
  active: boolean;
  joinedAt: number;
  nick: string | undefined;
  permissions: string | undefined;
  roles: string[];
  user: DbDiscordUser | undefined;
  communicationDisabledUntil: number | undefined;
  premiumSince: number | undefined;
}

export interface DbDiscordUser {
  userId: string;
  username: string;
  discriminator: string;
  avatar: string | undefined;
  locale: string | undefined;
  premiumType: DbDiscordPremiumTypes | undefined;
}

export interface DbUser {
  discordUserId: string;
}

export type WithDbId<T> = T & { _id: string };

export type WithoutMembers<T> = Omit<T, "members">;
