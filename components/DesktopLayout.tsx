
import React from 'react';
import { HomeIcon, ExploreIcon, LibraryIcon } from './Icons';
import { MediaItem, ViewType } from '../types';
import MediaCard from './MediaCard';
import { MOCK_MEDIA, CATEGORIES } from '../constants';

interface DesktopLayoutProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onTrackSelect: (track: MediaItem) => void;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({ currentView, onViewChange, onTrackSelect }) => {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="w-64 bg-black flex flex-col border-r border-white/5 pt-4">
        <div className="px-6 mb-8 flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
             <div className="w-4 h-4 bg-white rotate-45 rounded-sm"></div>
          </div>
          <h1 className="text-xl font-bold tracking-tight">NovaStream</h1>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          <button 
            onClick={() => onViewChange('home')}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-colors ${currentView === 'home' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'}`}
          >
            <HomeIcon /> <span className="font-medium">Home</span>
          </button>
          <button 
            onClick={() => onViewChange('explore')}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-colors ${currentView === 'explore' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'}`}
          >
            <ExploreIcon /> <span className="font-medium">Explore</span>
          </button>
          <button 
            onClick={() => onViewChange('library')}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-colors ${currentView === 'library' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'}`}
          >
            <LibraryIcon /> <span className="font-medium">Library</span>
          </button>
        </nav>

        <div className="p-6 mt-auto border-t border-white/5">
          <button className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <div className="w-6 h-6 border-2 border-dashed border-white/30 rounded flex items-center justify-center">+</div>
            <span className="text-sm font-medium">New Playlist</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-900 to-black p-8 pb-32">
        <header className="flex items-center justify-between mb-8 sticky top-0 bg-transparent backdrop-blur-md py-2 z-10">
          <div className="flex gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium border border-white/5 transition-all">
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search songs, artists, podcasts" 
                className="bg-white/10 border border-white/10 rounded-full px-6 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all text-sm"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white/10"></div>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Listen Again</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {MOCK_MEDIA.slice(0, 6).map(item => (
              <MediaCard key={item.id} item={item} onClick={onTrackSelect} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Trending Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_MEDIA.filter(m => m.type === 'video').map(item => (
              <div key={item.id} onClick={() => onTrackSelect(item)} className="group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-bold">{item.duration}</div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
                <h3 className="text-lg font-bold truncate">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.artist} • 1.2M views</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Quick Picks</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-2">
            {MOCK_MEDIA.slice(0, 12).map(item => (
              <MediaCard key={item.id} item={item} variant="list" onClick={onTrackSelect} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DesktopLayout;
