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
    heartbeat: () => void;
  }
> {
  private url: string;

  private token?: string;
  private isAuthenticated = false;

  private lastHeartbeat?: string;
  private heartbeatIntervalMs?: number;
  private heartbeatIntervalId?: number;

  constructor(url: string, token?: string, heartbeatIntervalMs?: number) {
    super();

    this.url = url;
    this.token = token;
    this.heartbeatIntervalMs = heartbeatIntervalMs;
    this.spawnSocket();

    this.addEventListener("message", ({ name, data }) => {
      switch (name) {
        case SocketMessageNames.AuthenticateRes: {
          this.isAuthenticated = true;

          this.dispatch("authenticated");
          break;
        }
        case SocketMessageNames.HeartbeatRes: {
          this.lastHeartbeat = new Date().toISOString();

          this.dispatch("heartbeat");
          break;
        }
      }
    });

    this.addEventListener("open", () => {
      if (this.token) this.authenticate(this.token);
      if (this.heartbeatIntervalMs) this.startHeartbeat();
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

  public getLastHeartbeat() {
    return this.lastHeartbeat;
  }

  private heartbeat() {
    this.send(SocketMessageNames.HeartbeatReq);
  }

  private stopHeartbeat() {
    clearInterval(this.heartbeatIntervalId);
  }

  private startHeartbeat() {
    this.stopHeartbeat();

    this.heartbeatIntervalId = setInterval(
      () => this.heartbeat(),
      this.heartbeatIntervalMs
    );
  }
}
