import { Key } from "@shared/lib/ts/generic.ts";
import EventManager, { Handler } from "./EventManager.ts";

export default class Socket<
  D extends Record<N, any> = Record<Key, any>,
  EH extends Record<E, Handler> = Record<Key, Handler>,
  N extends Key = keyof D,
  E extends Key = keyof EH
> extends EventManager<
  {
    open: () => void | Promise<void>;
    close: (reason: string, wasClean: boolean) => void | Promise<void>;
    error: () => void | Promise<void>;
    message: (data: Partial<D>) => void | Promise<void>;
    messageRaw: (
      data: string | ArrayBufferLike | Blob | ArrayBufferView
    ) => void | Promise<void>;
  } & EH
> {
  private socket?: WebSocket;

  constructor() {
    super();
  }

  public setSocket(socket: WebSocket) {
    this.socket = socket;
    this.registerEvents();
  }

  private registerEvents() {
    if (!this.socket) return;

    this.socket.onopen = () => (this.dispatch as any)("open");

    this.socket.onclose = (event) =>
      (this.dispatch as any)("close", event.reason, event.wasClean);
    this.socket.onerror = () => (this.dispatch as any)("error");
    this.socket.onmessage = (event) => {
      try {
        const { name, data } = JSON.parse(event.data) ?? {};
        (this.dispatch as any)("message", {
          [name]: data,
        });
      } catch (_err: any) {
        (this.dispatch as any)("messageRaw", event.data);
      }
    };
  }

  public destroy(code = 1000, reason = "Socket destroyed") {
    if (!this.socket) return;

    if (this.socket.readyState === WebSocket.CLOSED) return;

    this.socket.close(code, reason);
  }

  public send(name: N, data?: D) {
    if (!this.socket) return;

    this.socket.send(
      JSON.stringify({
        name,
        data,
      })
    );
  }

  public sendRaw(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    this.socket?.send(data);
  }
}
