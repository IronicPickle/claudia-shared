import { AudioSourceDetails } from "./audio.ts";

export enum AudioStreamSocketMessageNames {
  StateReq = "state-req",
  StateRes = "state-res",
  PlayReq = "play-req",
  PlayRes = "play-res",
  TrackStartEvent = "track-start-event",
  TrackEndEvent = "track-end-event",
  TrackNextEvent = "track-next-event",
  TrackPauseEvent = "track-pause-event",
  TrackResumeEvent = "track-resume-event",
  TrackSeekEvent = "track-seek-event",
  TrackStopEvent = "track-stop-event",
  QueueAddEvent = "queue-add-event",
  QueueSkipEvent = "queue-skip-event",
  FilterChangeEvent = "filter-change-event",
  FilterResetEvent = "filter-reset-event",
}

export interface AudioStreamSocketMessageData {
  [AudioStreamSocketMessageNames.PlayReq]: {
    name: AudioStreamSocketMessageNames.PlayReq;
    data: {
      query: string;
    };
  };
  [AudioStreamSocketMessageNames.PlayRes]: {
    name: AudioStreamSocketMessageNames.PlayRes;
    data: {
      success: boolean;
      track: AudioSourceDetails;
    };
  };
  [AudioStreamSocketMessageNames.StateReq]: {
    name: AudioStreamSocketMessageNames.StateReq;
    data: {};
  };
  [AudioStreamSocketMessageNames.StateRes]: {
    name: AudioStreamSocketMessageNames.StateRes;
    data: {
      success: boolean;

      queue: AudioSourceDetails[];
    };
  };
  [AudioStreamSocketMessageNames.TrackStartEvent]: {
    name: AudioStreamSocketMessageNames.TrackStartEvent;
    data: {};
  };
  [AudioStreamSocketMessageNames.TrackEndEvent]: {
    name: AudioStreamSocketMessageNames.TrackEndEvent;
    data: {};
  };
  [AudioStreamSocketMessageNames.TrackNextEvent]: {
    name: AudioStreamSocketMessageNames.TrackNextEvent;
    data: {};
  };
  [AudioStreamSocketMessageNames.TrackPauseEvent]: {
    name: AudioStreamSocketMessageNames.TrackPauseEvent;
    data: {};
  };
  [AudioStreamSocketMessageNames.TrackResumeEvent]: {
    name: AudioStreamSocketMessageNames.TrackResumeEvent;
    data: {};
  };
  [AudioStreamSocketMessageNames.TrackSeekEvent]: {
    name: AudioStreamSocketMessageNames.TrackSeekEvent;
    data: {};
  };
  [AudioStreamSocketMessageNames.TrackStopEvent]: {
    name: AudioStreamSocketMessageNames.TrackStopEvent;
    data: {};
  };
  [AudioStreamSocketMessageNames.QueueAddEvent]: {
    name: AudioStreamSocketMessageNames.QueueAddEvent;
    data: {
      track: AudioSourceDetails;
    };
  };
  [AudioStreamSocketMessageNames.QueueSkipEvent]: {
    name: AudioStreamSocketMessageNames.QueueSkipEvent;
    data: {};
  };
  [AudioStreamSocketMessageNames.FilterChangeEvent]: {
    name: AudioStreamSocketMessageNames.FilterChangeEvent;
    data: {};
  };
  [AudioStreamSocketMessageNames.FilterResetEvent]: {
    name: AudioStreamSocketMessageNames.FilterResetEvent;
    data: {};
  };
}

export type AudioStreamSocketMessage =
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.PlayReq]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.PlayRes]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.StateReq]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.StateRes]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.TrackStartEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.TrackEndEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.TrackNextEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.TrackPauseEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.TrackResumeEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.TrackSeekEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.TrackStopEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.QueueAddEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.QueueSkipEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.FilterChangeEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.FilterResetEvent];
