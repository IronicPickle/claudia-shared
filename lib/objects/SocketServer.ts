import { Key } from "@shared/lib/ts/generic.ts";
import Socket from "./Socket.ts";

type Authenticator = (token: string) => boolean | Promise<boolean>;

export default class SocketServer<
  D extends Record<N, any> = Record<Key, any>,
  N extends Key = keyof D
> extends Socket<
  {
    authenticate: {
      token: string;
    };
    authenticated: undefined;
  } & D,
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

    this.addEventListener("message", async (data) => {
      console.log("WS ->", data);
      if (data.authenticate && this.authenticator) {
        const success = await this.authenticator(data.authenticate.token);
        console.log("WS -> authentication:", success);
        if (success) {
          console.log("WS -> authenticated");
          this.isAuthenticated = true;

          this.dispatch("authenticated");
          this.send("authenticated" as any);
        } else {
          this.destroy(2000, "Authentication failed");
        }
        return;
      }
    });
  }

  public getIsAuthenticated() {
    return this.isAuthenticated;
  }
}
