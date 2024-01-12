import { ConsoleColor, HttpMethod } from "../enums/generic.ts";

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const discordIdRegex = /^\d{17,19}$/g;

export const urlPathRegex = /https?:\/\/.*?(\/.*)/g;

export const httpMethodColors: Record<HttpMethod, ConsoleColor> = {
  [HttpMethod.Acl]: ConsoleColor.White,
  [HttpMethod.Bind]: ConsoleColor.White,
  [HttpMethod.Checkout]: ConsoleColor.White,
  [HttpMethod.Connect]: ConsoleColor.White,
  [HttpMethod.Copy]: ConsoleColor.White,
  [HttpMethod.Delete]: ConsoleColor.Red,
  [HttpMethod.Get]: ConsoleColor.Green,
  [HttpMethod.Head]: ConsoleColor.White,
  [HttpMethod.Link]: ConsoleColor.White,
  [HttpMethod.Lock]: ConsoleColor.White,
  [HttpMethod.MSearch]: ConsoleColor.White,
  [HttpMethod.Merge]: ConsoleColor.White,
  [HttpMethod.MkActivity]: ConsoleColor.White,
  [HttpMethod.MkCalendar]: ConsoleColor.White,
  [HttpMethod.MkCol]: ConsoleColor.White,
  [HttpMethod.Move]: ConsoleColor.White,
  [HttpMethod.Notify]: ConsoleColor.White,
  [HttpMethod.Options]: ConsoleColor.White,
  [HttpMethod.Patch]: ConsoleColor.Yellow,
  [HttpMethod.Post]: ConsoleColor.Yellow,
  [HttpMethod.PropFind]: ConsoleColor.White,
  [HttpMethod.PropPatch]: ConsoleColor.White,
  [HttpMethod.Purge]: ConsoleColor.White,
  [HttpMethod.Put]: ConsoleColor.Yellow,
  [HttpMethod.Rebind]: ConsoleColor.White,
  [HttpMethod.Report]: ConsoleColor.White,
  [HttpMethod.Search]: ConsoleColor.White,
  [HttpMethod.Source]: ConsoleColor.White,
  [HttpMethod.Subscribe]: ConsoleColor.White,
  [HttpMethod.Trace]: ConsoleColor.White,
  [HttpMethod.Unbind]: ConsoleColor.White,
  [HttpMethod.Unlink]: ConsoleColor.White,
  [HttpMethod.Unlock]: ConsoleColor.White,
  [HttpMethod.Unsubscribe]: ConsoleColor.White,
};
