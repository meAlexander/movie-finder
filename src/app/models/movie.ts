import { Genre } from './genre';

export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  genres: Genre[];
  homepage: string;
  category: string;
}
