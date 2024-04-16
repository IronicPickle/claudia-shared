import { AudioSourceDetails } from "./audio.ts";

export enum AudioStreamSocketMessageNames {
  StateReq = "state-req",
  StateRes = "state-res",
  PlayReq = "play-req",
  PlayRes = "play-res",
}

export interface AudioStreamSocketMessageData {
  [AudioStreamSocketMessageNames.PlayReq]: {
    name: AudioStreamSocketMessageNames.PlayReq;
    data: {
      userId: string;
      query: string;
    };
  };
  [AudioStreamSocketMessageNames.PlayRes]: {
    name: AudioStreamSocketMessageNames.PlayRes;
    data: {
      userId: string;
      success: boolean;
      track: AudioSourceDetails;
    };
  };
  [AudioStreamSocketMessageNames.StateReq]: {
    name: AudioStreamSocketMessageNames.StateReq;
    data: {
      userId: string;
    };
  };
  [AudioStreamSocketMessageNames.StateRes]: {
    name: AudioStreamSocketMessageNames.StateRes;
    data: {
      userId: string;
      success: boolean;

      queue: AudioSourceDetails[];
    };
  };
}

export type AudioStreamSocketMessage =
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.PlayReq]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.PlayRes]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.StateReq]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.StateRes];
