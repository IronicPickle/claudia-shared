import SocketClient from "./SocketClient.ts";
import SocketServer from "./SocketServer.ts";
import { Key } from "../ts/generic.ts";

export default class SocketsManger<
  S extends Record<K, SocketClient | SocketServer>,
  K extends Key = keyof S
> {
  private sockets = {} as S;

  constructor() {}

  public getSockets() {
    return this.sockets;
  }

  public getSocket(key: K) {
    return this.sockets[key];
  }

  public add(key: K, socket: S[K]) {
    if (this.getSocket(key)) return;

    socket.addEventListener("close", (_reason, wasClean) => {
      if (wasClean) this.delete(key);
    });

    this.sockets[key] = socket;
  }

  public delete(key: K) {
    if (!this.getSocket(key)) return;

    if (this.sockets[key]) delete this.sockets[key];
  }

  public destroy(key: K) {
    const socket = this.getSocket(key);

    if (!socket) return;

    socket.destroy();

    this.delete(key);
  }
}
