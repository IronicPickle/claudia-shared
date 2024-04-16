import { Key } from "../ts/generic.ts";
import Socket from "./Socket.ts";
import { SocketMessageNames } from "../ts/sockets.ts";

export default class SocketClient<
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
  private url: string;

  private isAuthenticated = false;

  constructor(url: string, token?: string) {
    super();

    this.url = url;
    this.spawnSocket();

    this.addEventListener("message", ({ name, data }) => {
      switch (name) {
        case SocketMessageNames.AuthenticateRes: {
          this.isAuthenticated = true;

          this.dispatch("authenticated");
          break;
        }
      }
    });

    this.addEventListener("open", () => {
      if (token) this.authenticate(token);
    });

    this.addEventListener("close", (_reason, wasClean) => {
      if (wasClean) return;

      setTimeout(() => this.spawnSocket(), 1000 * 5);
    });
  }

  private spawnSocket() {
    this.setSocket(new WebSocket(this.url));
  }

  public authenticate(token: string) {
    this.send(SocketMessageNames.AuthenticateReq, {
      token,
    } as any);
  }

  public getIsAuthenticated() {
    return this.isAuthenticated;
  }
}
