
import React, { useState, useEffect, useCallback } from 'react';
import DesktopLayout from './components/DesktopLayout';
import MobileLayout from './components/MobileLayout';
import PlayerBar from './components/PlayerBar';
import FullScreenPlayer from './components/FullScreenPlayer';
import { PlayerState, MediaItem, ViewType } from './types';
import { MOCK_MEDIA } from './constants';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    volume: 80,
    progress: 0,
    isMuted: false,
    isShuffle: false,
    isRepeat: false,
    isFullScreen: false,
  });

  // Handle screen resize for responsive switching
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate playback progress
  useEffect(() => {
    let interval: any;
    if (playerState.isPlaying && playerState.currentTrack) {
      interval = setInterval(() => {
        setPlayerState(prev => ({
          ...prev,
          progress: prev.progress >= 100 ? 0 : prev.progress + 0.2
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [playerState.isPlaying, playerState.currentTrack]);

  const handleTrackSelect = useCallback((track: MediaItem) => {
    setPlayerState(prev => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      progress: 0
    }));
  }, []);

  const togglePlay = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const handleNext = useCallback(() => {
    const currentIndex = MOCK_MEDIA.findIndex(m => m.id === playerState.currentTrack?.id);
    const nextTrack = MOCK_MEDIA[(currentIndex + 1) % MOCK_MEDIA.length];
    handleTrackSelect(nextTrack);
  }, [playerState.currentTrack, handleTrackSelect]);

  const handlePrev = useCallback(() => {
    const currentIndex = MOCK_MEDIA.findIndex(m => m.id === playerState.currentTrack?.id);
    const prevTrack = MOCK_MEDIA[(currentIndex - 1 + MOCK_MEDIA.length) % MOCK_MEDIA.length];
    handleTrackSelect(prevTrack);
  }, [playerState.currentTrack, handleTrackSelect]);

  const toggleFullScreen = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isFullScreen: !prev.isFullScreen }));
  }, []);

  return (
    <div className="h-screen w-full select-none overflow-hidden bg-black text-white">
      {isMobile ? (
        <MobileLayout 
          currentView={currentView} 
          onViewChange={setCurrentView}
          onTrackSelect={handleTrackSelect}
          onPlayerExpand={toggleFullScreen}
        />
      ) : (
        <DesktopLayout 
          currentView={currentView} 
          onViewChange={setCurrentView}
          onTrackSelect={handleTrackSelect}
        />
      )}

      {/* Persistent UI Elements */}
      <PlayerBar 
        state={playerState} 
        onTogglePlay={togglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
        onSeek={(val) => setPlayerState(p => ({ ...p, progress: val }))}
        onExpand={toggleFullScreen}
        isMobile={isMobile}
      />

      {playerState.isFullScreen && (
        <FullScreenPlayer 
          state={playerState}
          onClose={toggleFullScreen}
          onTogglePlay={togglePlay}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};

export default App;
