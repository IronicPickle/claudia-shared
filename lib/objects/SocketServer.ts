import { Key } from "../ts/generic.ts";
import Socket from "./Socket.ts";
import { SocketMessageNames } from "../ts/sockets.ts";

type Authenticator = (token: string) => boolean | Promise<boolean>;

export default class SocketServer<
  D extends {
    name: Key;
    data: any;
  } = any
> extends Socket<
  D,
  {
    authenticated: () => void;
  }
> {
  private authenticator?: Authenticator;

  private isAuthenticated = false;

  constructor(socket: WebSocket, authenticator?: Authenticator) {
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
            this.send(SocketMessageNames.AuthenticateRes);
          } else {
            this.destroy(2000, "Authentication failed");
          }

          break;
        }
      }
    });
  }

  public getIsAuthenticated() {
    return this.isAuthenticated;
  }
}
