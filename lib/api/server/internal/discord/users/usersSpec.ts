import { DbDiscordPremiumTypes } from "../dbSpec.ts";

export interface UserCreate {
  params: {
    userId: string;
  };
  body: {
    username: string;
    discriminator: string;
    avatar: string | undefined;
    locale: string | undefined;
    premiumType: DbDiscordPremiumTypes | undefined;
  };
  res: {
    userId: string;
    username: string;
    discriminator: string;
    avatar: string | undefined;
    locale: string | undefined;
    premiumType: DbDiscordPremiumTypes | undefined;
  };
}

export interface UserUpdate {
  params: {
    userId: string;
  };
  body: {
    username?: string;
    discriminator?: string;
    avatar?: string | undefined;
    locale?: string | undefined;
    premiumType?: DbDiscordPremiumTypes | undefined;
  };
  res: {
    userId: string;
    username: string;
    discriminator: string;
    avatar: string | undefined;
    locale: string | undefined;
    premiumType: DbDiscordPremiumTypes | undefined;
  };
}

export interface UserUpsert {
  params: {
    userId: string;
  };
  body: {
    username: string;
    discriminator: string;
    avatar: string | undefined;
    locale: string | undefined;
    premiumType: DbDiscordPremiumTypes | undefined;
  };
  res: {
    userId: string;
    username: string;
    discriminator: string;
    avatar: string | undefined;
    locale: string | undefined;
    premiumType: DbDiscordPremiumTypes | undefined;
  };
}
