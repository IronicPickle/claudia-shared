export enum SocketMessageNames {
  AuthenticateReq = "authenticate-req",
  AuthenticateRes = "authenticate-res",
  HeartbeatReq = "heartbeat-req",
  HeartbeatRes = "heartbeat-res",
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

  [SocketMessageNames.HeartbeatReq]: {
    name: SocketMessageNames.HeartbeatReq;
    data: {};
  };
  [SocketMessageNames.HeartbeatRes]: {
    name: SocketMessageNames.HeartbeatRes;
    data: {};
  };
}

export type SocketMessage =
  | SocketMessageData[SocketMessageNames.AuthenticateReq]
  | SocketMessageData[SocketMessageNames.AuthenticateRes]
  | SocketMessageData[SocketMessageNames.HeartbeatReq]
  | SocketMessageData[SocketMessageNames.HeartbeatRes];
