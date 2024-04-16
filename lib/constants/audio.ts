import { AudioSourceType } from "../enums/audio.ts";

export const audioSourceTypeNames = {
  [AudioSourceType.YouTube]: "YouTube",
  [AudioSourceType.Spotify]: "Spotify",
  [AudioSourceType.SoundCloud]: "SoundCloud",
  [AudioSourceType.File]: "File",
  [AudioSourceType.Unknown]: "Unknown",
};

export const audioSourceTypeColors = {
  [AudioSourceType.YouTube]: "0xFF0000",
  [AudioSourceType.Spotify]: "0x1ED760",
  [AudioSourceType.SoundCloud]: "0xFF7700",
  [AudioSourceType.File]: "0xFFFFFF",
  [AudioSourceType.Unknown]: "0xFFFFFF",
};
