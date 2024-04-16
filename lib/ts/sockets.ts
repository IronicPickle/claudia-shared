export enum SocketMessageNames {
  AuthenticateReq = "authenticate-req",
  AuthenticateRes = "authenticate-res",
}

export interface SocketMessageData {
  [SocketMessageNames.AuthenticateReq]: {
    name: SocketMessageNames.AuthenticateReq;
    data: {
      token: string;
    };
  };
  [SocketMessageNames.AuthenticateRes]: {
    name: SocketMessageNames.AuthenticateRes;
    data: {};
  };
}

export type SocketMessage =
  | SocketMessageData[SocketMessageNames.AuthenticateReq]
  | SocketMessageData[SocketMessageNames.AuthenticateRes];
