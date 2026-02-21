
import React from 'react';
import { MediaItem, MediaType } from '../types';
import { PlayIcon } from './Icons';

interface MediaCardProps {
  item: MediaItem;
  onClick: (item: MediaItem) => void;
  variant?: 'grid' | 'list';
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onClick, variant = 'grid' }) => {
  if (variant === 'list') {
    return (
      <div 
        onClick={() => onClick(item)}
        className="flex items-center gap-4 p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors group"
      >
        <div className="relative w-12 h-12 flex-shrink-0">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover rounded shadow" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayIcon size={20} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{item.title}</h4>
          <p className="text-xs text-white/60 truncate">{item.artist} • {item.duration}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(item)}
      className="group cursor-pointer space-y-3"
    >
      <div className="relative aspect-square overflow-hidden rounded-md shadow-lg">
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
            <PlayIcon size={32} />
          </div>
        </div>
        {item.type === MediaType.VIDEO && (
          <div className="absolute top-2 right-2 bg-black/60 px-1.5 py-0.5 rounded text-[10px] font-bold">VIDEO</div>
        )}
      </div>
      <div>
        <h3 className="font-bold text-base truncate group-hover:underline">{item.title}</h3>
        <p className="text-sm text-white/50 truncate">
          {item.type === MediaType.PODCAST ? 'Podcast' : item.artist}
        </p>
      </div>
    </div>
  );
};

export default MediaCard;
