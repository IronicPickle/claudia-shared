import { AudioSourceDetails, AudioStreamFilters } from "./audio.ts";

export enum AudioStreamSocketMessageNames {
  StateReq = "state-req",
  StateRes = "state-res",

  PlayReq = "play-req",
  PlayRes = "play-res",
  SkipReq = "skip-req",
  SkipRes = "skip-res",
  StopReq = "stop-req",
  StopRes = "stop-res",

  PauseReq = "pause-req",
  PauseRes = "pause-res",
  ResumeReq = "resume-req",
  ResumeRes = "resume-res",

  SeekReq = "seek-req",
  SeekRes = "seek-res",
  SetFiltersReq = "set-filters-req",
  SetFiltersRes = "set-filters-res",

  TrackStartEvent = "track-start-event",
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
  [AudioStreamSocketMessageNames.SkipReq]: {
    name: AudioStreamSocketMessageNames.SkipReq;
    data: {};
  };
  [AudioStreamSocketMessageNames.SkipRes]: {
    name: AudioStreamSocketMessageNames.SkipRes;
    data: {
      success: boolean;
    };
  };
  [AudioStreamSocketMessageNames.StopReq]: {
    name: AudioStreamSocketMessageNames.StopReq;
    data: {};
  };
  [AudioStreamSocketMessageNames.StopRes]: {
    name: AudioStreamSocketMessageNames.StopRes;
    data: {
      success: boolean;
    };
  };

  [AudioStreamSocketMessageNames.PauseReq]: {
    name: AudioStreamSocketMessageNames.PauseReq;
    data: {};
  };
  [AudioStreamSocketMessageNames.PauseRes]: {
    name: AudioStreamSocketMessageNames.PauseRes;
    data: {
      success: boolean;
    };
  };
  [AudioStreamSocketMessageNames.ResumeReq]: {
    name: AudioStreamSocketMessageNames.ResumeReq;
    data: {};
  };
  [AudioStreamSocketMessageNames.ResumeRes]: {
    name: AudioStreamSocketMessageNames.ResumeRes;
    data: {
      success: boolean;
    };
  };

  [AudioStreamSocketMessageNames.SeekReq]: {
    name: AudioStreamSocketMessageNames.SeekReq;
    data: {
      position: number;
    };
  };
  [AudioStreamSocketMessageNames.SeekRes]: {
    name: AudioStreamSocketMessageNames.SeekRes;
    data: {
      success: boolean;
    };
  };
  [AudioStreamSocketMessageNames.SetFiltersReq]: {
    name: AudioStreamSocketMessageNames.SetFiltersReq;
    data: {
      filters: AudioStreamFilters;
    };
  };
  [AudioStreamSocketMessageNames.SetFiltersRes]: {
    name: AudioStreamSocketMessageNames.SetFiltersRes;
    data: {
      success: boolean;
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
      trackTime: number | undefined;
      filters: AudioStreamFilters;
      isPaused: boolean;
    };
  };
  [AudioStreamSocketMessageNames.TrackStartEvent]: {
    name: AudioStreamSocketMessageNames.TrackStartEvent;
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
    data: {
      trackPosition: number;
    };
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
    data: {
      filters: AudioStreamFilters;
    };
  };
  [AudioStreamSocketMessageNames.FilterResetEvent]: {
    name: AudioStreamSocketMessageNames.FilterResetEvent;
    data: {};
  };
}

export type AudioStreamSocketMessage =
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.PlayReq]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.PlayRes]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.SkipReq]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.SkipRes]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.StopReq]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.StopRes]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.PauseReq]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.PauseRes]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.ResumeReq]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.ResumeRes]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.SeekReq]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.SeekRes]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.SetFiltersReq]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.SetFiltersRes]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.StateReq]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.StateRes]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.TrackStartEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.TrackNextEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.TrackPauseEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.TrackResumeEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.TrackSeekEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.TrackStopEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.QueueAddEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.QueueSkipEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.FilterChangeEvent]
  | AudioStreamSocketMessageData[AudioStreamSocketMessageNames.FilterResetEvent];
