
import React, { useState, useEffect } from 'react';
import { PlayerState, MediaItem } from '../types';
import { PlayIcon, PauseIcon, SkipNextIcon, SkipPrevIcon, ShuffleIcon, RepeatIcon } from './Icons';
import { getSmartRecommendation } from '../services/geminiService';

interface FullScreenPlayerProps {
  state: PlayerState;
  onClose: () => void;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({ state, onClose, onTogglePlay, onNext, onPrev }) => {
  const [aiInfo, setAiInfo] = useState<{vibeDescription: string, similarArtists: string[]} | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.currentTrack) {
      setLoading(true);
      getSmartRecommendation(state.currentTrack.title, state.currentTrack.artist)
        .then(info => {
          setAiInfo(info);
          setLoading(false);
        });
    }
  }, [state.currentTrack?.id]);

  if (!state.currentTrack) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl overflow-y-auto animate-in fade-in zoom-in duration-300">
      <div className="max-w-6xl mx-auto min-h-screen flex flex-col p-6 md:p-12">
        <header className="flex items-center justify-between mb-8">
           <button onClick={onClose} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
           </button>
           <h2 className="text-sm font-bold tracking-widest uppercase opacity-50">Now Playing</h2>
           <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
           </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start flex-1">
          {/* Main Visual */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="aspect-square w-full max-w-[500px] mx-auto relative rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)]">
               <img src={state.currentTrack.thumbnail} className="w-full h-full object-cover" alt="" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black mb-2 leading-tight">{state.currentTrack.title}</h1>
                  <p className="text-xl text-white/60">{state.currentTrack.artist}</p>
                </div>
                <button className="p-3 text-white/50 hover:text-red-500 transition-colors">
                  <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
              </div>

              {/* Progress Slider */}
              <div className="space-y-2 group">
                <div className="h-1.5 w-full bg-white/10 rounded-full relative cursor-pointer">
                   <div className="absolute h-full bg-white rounded-full" style={{ width: `${state.progress}%` }}>
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                   </div>
                </div>
                <div className="flex justify-between text-xs font-medium text-white/40">
                  <span>1:24</span>
                  <span>{state.currentTrack.duration}</span>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-between pt-4">
                <button className="text-white/40 hover:text-white transition-colors"><ShuffleIcon size={24} /></button>
                <div className="flex items-center gap-8 md:gap-12">
                  <button onClick={onPrev} className="text-white/70 hover:text-white transition-transform active:scale-90"><SkipPrevIcon size={40} /></button>
                  <button 
                    onClick={onTogglePlay} 
                    className="w-20 h-20 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                  >
                    {state.isPlaying ? <PauseIcon size={40} /> : <PlayIcon size={40} />}
                  </button>
                  <button onClick={onNext} className="text-white/70 hover:text-white transition-transform active:scale-90"><SkipNextIcon size={40} /></button>
                </div>
                <button className="text-white/40 hover:text-white transition-colors"><RepeatIcon size={24} /></button>
              </div>
            </div>
          </div>

          {/* AI Insights & Lyrics Simulation */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="bg-white/5 rounded-3xl p-8 border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-600/20 text-red-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-red-500/30">Nova AI Insight</div>
              </div>
              
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                  <div className="h-4 bg-white/10 rounded w-1/2"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-3">The Vibe</h3>
                    <p className="text-lg leading-relaxed text-white/80">{aiInfo?.vibeDescription || "Exploring the deep sonic landscapes and rhythmic textures of this piece..."}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-3">Similar To</h3>
                    <div className="flex flex-wrap gap-2">
                       {aiInfo?.similarArtists.map(artist => (
                         <span key={artist} className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium border border-white/10">{artist}</span>
                       )) || ["Artist 1", "Artist 2", "Artist 3"].map(a => (
                        <span key={a} className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium border border-white/10">{a}</span>
                       ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/5 flex-1 min-h-[300px]">
               <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6">Lyrics</h3>
               <div className="space-y-6 text-2xl font-bold text-white/20">
                  <p>In the quiet of the night...</p>
                  <p className="text-white">When the shadows start to dance...</p>
                  <p>We'll find our way together...</p>
                  <p>Underneath the starlit trance...</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenPlayer;
