import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { MovieCategory } from '../constants/movie-category';
import { ResponseAPI } from '../models/response-api';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly BASE_URL: string = 'https://api.themoviedb.org/3';

  private readonly API_KEY: string = '&api_key=fd2b31ba31547fa1ed49129738f2d156';
  private readonly API_KEY_ALT: string = '?api_key=fd2b31ba31547fa1ed49129738f2d156';

  private readonly POPULAR: string = '/discover/movie?sort_by=popularity.desc&page=';
  private readonly IN_THEATER: string = '/discover/movie?primary_release_date.gte=2021-12-01&primary_release_date.gte=2021-12-30&page=';
  private readonly KIDS: string = '/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&page=';
  private readonly VOTE_COUNT: string = '/discover/movie?sort_by=vote_count.desc&page=';

  constructor (private httpClient: HttpClient) { }

  public getPopularMovies (page: number = 1): Observable<Category> {
    return this.getMoviesBaseQuery(this.POPULAR, page, MovieCategory.popularMovies);
  }

  public getInTheaterMovies (page: number = 1): Observable<Category> {
    return this.getMoviesBaseQuery(this.IN_THEATER, page, MovieCategory.inTheaterMovies);
  }

  public getPopularKidsMovies (page: number = 1): Observable<Category> {
    return this.getMoviesBaseQuery(this.KIDS, page, MovieCategory.kidsMovies);
  }

  public getTopRatedMovies (page: number = 1): Observable<Category> {
    return this.getMoviesBaseQuery(this.VOTE_COUNT, page, MovieCategory.topRatedMovies);
  }

  public getMovieDetails (id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(this.BASE_URL + `/movie/${id}` + this.API_KEY_ALT);
  }

  public searchMovie (movieSearch: string, page: number = 1): Observable<Category> {
    return this.httpClient.get<ResponseAPI>(this.BASE_URL + '/search/movie' + this.API_KEY_ALT + `&query=${movieSearch}&page=${page}`)
      .pipe(
        map((data) => {
          const categoryMovies: Category = new Category();
          categoryMovies.movies = data.results;
          categoryMovies.totalPages = data.total_pages;
          categoryMovies.totalResults = data.total_results;
          return categoryMovies;
        })
      );
  }

  private getMoviesBaseQuery (url: string, page: number = 1, genre: string): Observable<Category> {
    return this.httpClient.get<ResponseAPI>(this.BASE_URL + url + page + this.API_KEY)
      .pipe(
        map((data: ResponseAPI) => {
          const category: Category = new Category();
          category.movies = data.results;
          category.title = genre;
          category.totalPages = data.total_pages;
          category.totalResults = data.total_results;
          return category;
        }));
  }
}
