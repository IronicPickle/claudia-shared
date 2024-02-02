import { RequestDetails } from "../../ts/api/generic.ts";

export interface RequestSpec extends RequestDetails {
  body: {
    code: string;
    grant_type: string;
    redirect_uri: string;
    scope: string;
  };
  res: {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
  };
}
