import { AudioSourceType } from "../enums/audio.ts";

export interface AudioSourceDetailsShared {
  id?: string;
  url?: string;
  title?: string;
  artist?: string;
  album?: string;
  duration?: number;
  date?: string;
}

export interface AudioSourceDetailsYouTube {
  type: AudioSourceType.YouTube;
}

export interface AudioSourceDetailsSpotify {
  type: AudioSourceType.Spotify;
}

export interface AudioSourceDetailsSoundCloud {
  type: AudioSourceType.SoundCloud;
}

export interface AudioSourceDetailsFile {
  type: AudioSourceType.File;
}

export interface AudioSourceDetailsUnknown {
  type: AudioSourceType.Unknown;
}

export type AudioSourceDetails = (
  | AudioSourceDetailsYouTube
  | AudioSourceDetailsSpotify
  | AudioSourceDetailsSoundCloud
  | AudioSourceDetailsFile
  | AudioSourceDetailsUnknown
) &
  AudioSourceDetailsShared;
