
import { MediaItem, MediaType } from './types';

export const MOCK_MEDIA: MediaItem[] = [
  {
    id: '1',
    title: 'Midnight City',
    artist: 'M83',
    thumbnail: 'https://picsum.photos/seed/m83/600/600',
    duration: '4:03',
    type: MediaType.MUSIC,
    category: 'Synth-pop'
  },
  {
    id: '2',
    title: 'The Daily',
    artist: 'The New York Times',
    thumbnail: 'https://picsum.photos/seed/pod1/600/600',
    duration: '28:15',
    type: MediaType.PODCAST,
    category: 'News'
  },
  {
    id: '3',
    title: 'Interstellar Main Theme',
    artist: 'Hans Zimmer',
    thumbnail: 'https://picsum.photos/seed/zimmer/600/600',
    duration: '12:06',
    type: MediaType.VIDEO,
    category: 'Cinematic'
  },
  {
    id: '4',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    thumbnail: 'https://picsum.photos/seed/weeknd/600/600',
    duration: '3:20',
    type: MediaType.MUSIC,
    category: 'Pop'
  },
  {
    id: '5',
    title: 'Lex Fridman Podcast #400',
    artist: 'Lex Fridman',
    thumbnail: 'https://picsum.photos/seed/lex/600/600',
    duration: '3:45:00',
    type: MediaType.PODCAST,
    category: 'Education'
  },
  {
    id: '6',
    title: 'Starboy',
    artist: 'The Weeknd ft. Daft Punk',
    thumbnail: 'https://picsum.photos/seed/starboy/600/600',
    duration: '3:50',
    type: MediaType.MUSIC,
    category: 'R&B'
  },
  {
    id: '7',
    title: 'AI Revolution',
    artist: 'Tech Insider',
    thumbnail: 'https://picsum.photos/seed/tech/600/600',
    duration: '15:20',
    type: MediaType.VIDEO,
    category: 'Technology'
  },
  {
    id: '8',
    title: 'Levitating',
    artist: 'Dua Lipa',
    thumbnail: 'https://picsum.photos/seed/dua/600/600',
    duration: '3:23',
    type: MediaType.MUSIC,
    category: 'Dance-Pop'
  }
];

export const CATEGORIES = ['All', 'Energize', 'Workout', 'Relax', 'Focus', 'Commute'];
