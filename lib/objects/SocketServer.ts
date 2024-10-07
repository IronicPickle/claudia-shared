import { Key } from "../ts/generic.ts";
import Socket from "./Socket.ts";
import { SocketMessageNames } from "../ts/sockets.ts";

type Authenticator = (token: string) => boolean | Promise<boolean>;

interface Config {
  resOnAuth?: boolean;
}

export default class SocketServer<
  D extends {
    name: Key;
    data: any;
  } = any
> extends Socket<
  D,
  {
    authenticated: () => void;
    heartbeat: () => void;
  }
> {
  private authenticator?: Authenticator;

  private isAuthenticated = false;

  private lastHeartbeat: string | undefined;

  constructor(
    socket: WebSocket,
    authenticator?: Authenticator,
    conifg: Config = {
      resOnAuth: true,
    }
  ) {
    super();

    this.authenticator = authenticator;

    this.setSocket(socket);

    this.addEventListener("message", async ({ name, data }) => {
      switch (name) {
        case SocketMessageNames.AuthenticateReq: {
          if (!this.authenticator) break;

          const success = await this.authenticator(data.token);
          if (success) {
            this.isAuthenticated = true;

            this.dispatch("authenticated");
            if (conifg.resOnAuth) this.send(SocketMessageNames.AuthenticateRes);
          } else {
            console.log("auth failed");
            this.destroy(3000, "Authentication failed");
          }

          break;
        }
        case SocketMessageNames.HeartbeatReq: {
          this.lastHeartbeat = new Date().toISOString();

          this.dispatch("heartbeat");
          this.send(SocketMessageNames.HeartbeatRes);
        }
      }
    });
  }

  public getIsAuthenticated() {
    return this.isAuthenticated;
  }

  public getLastHeartbeat() {
    return this.lastHeartbeat;
  }
}
