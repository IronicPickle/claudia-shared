import { RequestDetails } from "../../../../../../ts/api/generic.ts";

export interface RequestSpec extends RequestDetails {
  params: {
    guildId: string;
  };
  res: {};
}
