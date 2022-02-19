import { Movie } from './movie';

export class Category {
  title: string;
  movies: Movie[];
  totalPages: number;
  totalResults: number;
}
