import { RequestDetails } from "../../ts/api/generic.ts";

export interface RequestSpec extends RequestDetails {
  body: {
    access_token: string;
  };
  res: {
    application: {
      id: string;
      name: string;
      icon: string;
      description: string;
      hook: boolean;
      bot_public: boolean;
      bot_require_code_grant: boolean;
      verify_key: string;
    };
    scopes: string[];
    expires: string;
    user: {
      id: string;
      username: string;
      avatar: string;
      discriminator: string;
      global_name: string;
      public_flags: number;
    };
  };
}
