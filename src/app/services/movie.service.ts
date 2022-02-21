import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { ResponseAPI } from '../models/response-api';
import { Category } from '../models/Category';
import { CATEGORY_MOVIES_METADATA } from '../constants/category-movies-metadata.const';
import { CategoryMovieMetadata } from '../constants/category-movie-metadata';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public readonly categoryConfig: {
    [name: string]: CategoryMovieMetadata;
  } = CATEGORY_MOVIES_METADATA;

  public lastCategoryName: string;
  private readonly BASE_URL: string = 'https://api.themoviedb.org/3';

  private readonly API_KEY: string = '&api_key=fd2b31ba31547fa1ed49129738f2d156';
  private readonly API_KEY_ALT: string = '?api_key=fd2b31ba31547fa1ed49129738f2d156';

  constructor (private httpClient: HttpClient) { }

  public getPopularMovies (): Observable<Category> {
    return this.getMoviesBaseQuery(undefined, this.categoryConfig['POPULAR_MOVIES']);
  }

  public getInTheaterMovies (): Observable<Category> {
    return this.getMoviesBaseQuery(undefined, this.categoryConfig['THEATER_MOVIES']);
  }

  public getPopularKidsMovies (): Observable<Category> {
    return this.getMoviesBaseQuery(undefined, this.categoryConfig['KIDS_MOVIES']);
  }

  public getTopRatedMovies (): Observable<Category> {
    return this.getMoviesBaseQuery(undefined, this.categoryConfig['TOP_RATED_MOVIES']);
  }

  public searchMovie (movieSearch: string): Observable<Category> {
    this.categoryConfig['SEARCHED_MOVIES'].searchParam = movieSearch;
    return this.getMoviesBaseQuery(undefined, this.categoryConfig['SEARCHED_MOVIES']);
  }

  public getMovieDetails (id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(this.BASE_URL + `/movie/${id}` + this.API_KEY_ALT);
  }

  public getMoviesBaseQuery (page: number = 1, categoryMetadata: CategoryMovieMetadata): Observable<Category> {
    let url: string;
    if (categoryMetadata.name === this.categoryConfig['SEARCHED_MOVIES'].name) {
      const movieSearch: string = this.categoryConfig['SEARCHED_MOVIES'].searchParam;
      url = '/search/movie' + this.API_KEY_ALT + `&query=${movieSearch}&page=${page}`;
    } else {
      url = categoryMetadata.categoryUrl + page + this.API_KEY;
    }
    return this.httpClient.get<ResponseAPI>(this.BASE_URL + url)
      .pipe(
        map((data: ResponseAPI) => {
          const category: Category = new Category();
          category.movies = data.results;
          category.totalPages = data.total_pages;
          category.totalResults = data.total_results;
          category.categoryName = categoryMetadata.name;
          this.lastCategoryName = categoryMetadata.category;
          return category;
        }));
  }
}
