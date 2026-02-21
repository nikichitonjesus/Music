
export enum MediaType {
  MUSIC = 'music',
  VIDEO = 'video',
  PODCAST = 'podcast'
}

export interface MediaItem {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  type: MediaType;
  category: string;
}

export interface PlayerState {
  currentTrack: MediaItem | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  isMuted: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  isFullScreen: boolean;
}

export type ViewType = 'home' | 'explore' | 'library' | 'upgrade';
