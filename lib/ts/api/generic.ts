export interface RequestDetails {
  params?: {};
  body?: {};
  query?: {};
  res: {};
}

export type RequestResponse<D extends RequestDetails> = D["res"];
export type RequestInputs<D extends RequestDetails> = Omit<D, "res">;

export type ValidatorInputs<D extends RequestDetails> = Partial<
  D["params"] & D["body"] & D["query"]
>;

export type ReqParams<
  R extends {
    params: Record<string, unknown>;
  }
> = Partial<R["params"]>;

export type ReqBody<
  R extends {
    body: Record<string, unknown>;
  }
> = Partial<R["body"]>;

export type ReqQuery<
  R extends {
    query: Record<string, unknown>;
  }
> = Partial<R["query"]>;

export type ReqRes<
  R extends {
    res: Record<string, unknown>;
  }
> = R["res"];

export type ValidationErrors<K extends string | number | symbol> = {
  failed: boolean;
} & Partial<Record<K, string[]>>;

export type ApiError<K extends string | number | symbol> = {
  error: any;
  errorCode: any;
  validation: ValidationErrors<K>;
};

export type ApiCallRes<R> =
  | {
      error: ApiError<keyof R>;
    }
  | {
      data: R;
    };

export interface ApiTokens {
  sessionToken: string;
  refreshToken: string;
}
