import { Key } from "@shared/lib/ts/generic.ts";
import Socket from "./Socket.ts";

export default class SocketClient<
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
  private url: string;

  private isAuthenticated = false;

  constructor(url: string, token?: string) {
    super();

    this.url = url;
    this.spawnSocket();

    this.addEventListener("message", (data) => {
      if (data.authenticated) {
        this.isAuthenticated = true;

        this.dispatch("authenticated");
        return;
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
    this.send("authenticate", {
      token,
    } as any);
  }

  public getIsAuthenticated() {
    return this.isAuthenticated;
  }
}
