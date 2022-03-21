import { Movie } from './movie';

export class Category {
  categoryName: string;
  movies: Movie[];
  totalPages: number;
  totalResults: number;
  url: string;
}
