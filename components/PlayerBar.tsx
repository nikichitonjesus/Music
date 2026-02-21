
import React, { useState, useEffect } from 'react';
import { PlayerState, MediaItem, MediaType } from '../types';
import { PlayIcon, PauseIcon, SkipNextIcon, SkipPrevIcon, ShuffleIcon, RepeatIcon } from './Icons';

interface PlayerBarProps {
  state: PlayerState;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (value: number) => void;
  onExpand: () => void;
  isMobile: boolean;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ state, onTogglePlay, onNext, onPrev, onSeek, onExpand, isMobile }) => {
  if (!state.currentTrack) return null;

  if (isMobile) {
    return (
      <div 
        className="fixed bottom-16 left-2 right-2 bg-zinc-800/95 backdrop-blur-lg rounded-xl flex items-center p-2 z-40 border border-white/10 shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button')) return;
          onExpand();
        }}
      >
        <img src={state.currentTrack.thumbnail} className="w-10 h-10 rounded-lg object-cover mr-3" alt="" />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold truncate">{state.currentTrack.title}</h4>
          <p className="text-xs text-white/50 truncate">{state.currentTrack.artist}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onTogglePlay} className="p-2 text-white">
            {state.isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
          </button>
          <button onClick={onNext} className="p-2 text-white">
            <SkipNextIcon size={24} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 h-0.5 bg-white/20 w-full overflow-hidden rounded-b-xl">
           <div 
             className="h-full bg-white transition-all duration-300 ease-linear" 
             style={{ width: `${state.progress}%` }}
           />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/5 h-20 px-4 flex items-center justify-between z-50">
      {/* Controls */}
      <div className="flex items-center gap-4 w-1/4">
        <button onClick={onPrev} className="text-white/70 hover:text-white"><SkipPrevIcon size={28} /></button>
        <button 
          onClick={onTogglePlay} 
          className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          {state.isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} />}
        </button>
        <button onClick={onNext} className="text-white/70 hover:text-white"><SkipNextIcon size={28} /></button>
      </div>

      {/* Progress & Track Info */}
      <div className="flex-1 flex flex-col items-center max-w-2xl">
        <div className="w-full flex items-center gap-4 group">
          <span className="text-[10px] text-white/50 w-10 text-right">1:24</span>
          <div 
            className="flex-1 h-1 bg-white/20 rounded-full relative cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              onSeek((x / rect.width) * 100);
            }}
          >
            <div 
              className="absolute h-full bg-red-600 rounded-full" 
              style={{ width: `${state.progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
            </div>
          </div>
          <span className="text-[10px] text-white/50 w-10">{state.currentTrack.duration}</span>
        </div>
        <div className="mt-2 text-center">
           <span className="font-bold text-sm">{state.currentTrack.title}</span>
           <span className="mx-2 text-white/30">•</span>
           <span className="text-white/50 text-xs">{state.currentTrack.artist}</span>
        </div>
      </div>

      {/* Track info (Right Side) */}
      <div className="w-1/4 flex items-center justify-end gap-6">
        <div className="flex items-center gap-3">
          <button className="text-white/50 hover:text-white"><ShuffleIcon size={20} /></button>
          <button className="text-white/50 hover:text-white"><RepeatIcon size={20} /></button>
          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
          <div className="flex items-center gap-2 group w-32">
             <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
             <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[80%]"></div>
             </div>
          </div>
        </div>
        <img src={state.currentTrack.thumbnail} className="w-12 h-12 rounded object-cover shadow-lg hover:scale-105 transition-transform cursor-pointer" alt="" onClick={onExpand} />
      </div>
    </div>
  );
};

export default PlayerBar;
