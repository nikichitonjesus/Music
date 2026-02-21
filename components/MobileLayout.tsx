
import React from 'react';
import { HomeIcon, ExploreIcon, LibraryIcon } from './Icons';
import { MediaItem, ViewType } from '../types';
import MediaCard from './MediaCard';
import { MOCK_MEDIA, CATEGORIES } from '../constants';

interface MobileLayoutProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onTrackSelect: (track: MediaItem) => void;
  onPlayerExpand: () => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ currentView, onViewChange, onTrackSelect }) => {
  return (
    <div className="flex flex-col h-full bg-black">
      {/* Top Header */}
      <header className="flex items-center justify-between p-4 sticky top-0 bg-black/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
             <div className="w-3 h-3 bg-white rotate-45 rounded-sm"></div>
          </div>
          <h1 className="text-lg font-bold">NovaStream</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-500"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-32">
        {/* Category Pills */}
        <div className="flex gap-3 overflow-x-auto px-4 py-4 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button key={cat} className="px-4 py-2 rounded-full bg-white/10 text-sm font-medium whitespace-nowrap border border-white/5">
              {cat}
            </button>
          ))}
        </div>

        <div className="px-4 mt-4">
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Start Radio from a song</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {MOCK_MEDIA.map(item => (
                <div key={item.id} className="w-40 flex-shrink-0">
                  <MediaCard item={item} onClick={onTrackSelect} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Mixed for you</h2>
            <div className="grid grid-cols-2 gap-4">
              {MOCK_MEDIA.slice(0, 4).map(item => (
                 <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden group" onClick={() => onTrackSelect(item)}>
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end">
                      <p className="font-bold text-sm leading-tight">{item.title}</p>
                      <p className="text-xs text-white/70">Mix</p>
                    </div>
                 </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Quick picks</h2>
            <div className="flex flex-col gap-1">
              {MOCK_MEDIA.slice(0, 5).map(item => (
                <MediaCard key={item.id} item={item} variant="list" onClick={onTrackSelect} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around py-3 z-50">
        <button 
          onClick={() => onViewChange('home')}
          className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-white' : 'text-white/50'}`}
        >
          <HomeIcon size={24} />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button 
          onClick={() => onViewChange('explore')}
          className={`flex flex-col items-center gap-1 ${currentView === 'explore' ? 'text-white' : 'text-white/50'}`}
        >
          <ExploreIcon size={24} />
          <span className="text-[10px] font-medium">Explore</span>
        </button>
        <button 
          onClick={() => onViewChange('library')}
          className={`flex flex-col items-center gap-1 ${currentView === 'library' ? 'text-white' : 'text-white/50'}`}
        >
          <LibraryIcon size={24} />
          <span className="text-[10px] font-medium">Library</span>
        </button>
      </nav>
    </div>
  );
};

export default MobileLayout;
