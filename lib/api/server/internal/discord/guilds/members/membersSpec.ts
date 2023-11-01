import { DbDiscordUser } from "../../dbSpec.ts";

export interface GuildMemberCreate {
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

export interface GuildMemberUpdate {
  params: {
    guildId: string;
    memberId: string;
  };
  body: {
    active?: boolean;
    avatar?: string | undefined;
    joinedAt?: number;
    nick?: string | undefined;
    permissions?: string | undefined;
    roles?: string[];
    communicationDisabledUntil?: number | undefined;
    premiumSince?: number | undefined;
    user?: DbDiscordUser | undefined;
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

export interface GuildMemberUpsert {
  params: {
    guildId: string;
    memberId: string;
  };
  body: {
    active: boolean;
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
