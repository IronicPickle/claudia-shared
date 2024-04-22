import { Key } from "@shared/lib/ts/generic.ts";
import EventManager, { Handler } from "./EventManager.ts";

export default class Socket<
  M extends {
    name: Key;
    data: any;
  },
  EH extends Record<E, Handler> = Record<Key, Handler>,
  E extends Key = keyof EH
> extends EventManager<
  {
    open: () => void | Promise<void>;
    close: (code: number, wasClean: boolean) => void | Promise<void>;
    error: () => void | Promise<void>;
    message: (data: M) => void | Promise<void>;
    messageRaw: (
      data: string | ArrayBufferLike | Blob | ArrayBufferView
    ) => void | Promise<void>;
  } & EH
> {
  public id: string;

  private socket?: WebSocket;

  constructor() {
    super();

    this.id = crypto.randomUUID();
  }

  public setSocket(socket: WebSocket) {
    this.socket = socket;
    this.registerEvents();
  }

  private registerEvents() {
    if (!this.socket) return;

    this.socket.onopen = () => (this.dispatch as any)("open");

    this.socket.onclose = (event) =>
      (this.dispatch as any)("close", event.code, event.wasClean);
    this.socket.onerror = () => (this.dispatch as any)("error");
    this.socket.onmessage = (event) => {
      try {
        const { name, data } = JSON.parse(event.data) ?? {};
        (this.dispatch as any)("message", {
          name,
          data,
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

  public send(name: M["name"], data?: M["data"]) {
    if (this.socket?.readyState !== WebSocket.OPEN) return;

    this.socket.send(
      JSON.stringify({
        name,
        data,
      })
    );
  }

  public sendRaw(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (this.socket?.readyState !== WebSocket.OPEN) return;

    this.socket?.send(data);
  }
}
