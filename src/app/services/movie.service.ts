import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { MovieCategory } from '../constants/movie-category';
import { ResponseAPI } from '../models/response-api';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public lastUrl: string;
  public lastTitle: string;
  private readonly BASE_URL: string = 'https://api.themoviedb.org/3';

  private readonly API_KEY: string = '&api_key=fd2b31ba31547fa1ed49129738f2d156';
  private readonly API_KEY_ALT: string = '?api_key=fd2b31ba31547fa1ed49129738f2d156';

  private readonly POPULAR: string = '/discover/movie?sort_by=popularity.desc&page=';
  private readonly IN_THEATER: string = '/discover/movie?primary_release_date.gte=2021-12-01&primary_release_date.gte=2021-12-30&page=';
  private readonly KIDS: string = '/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&page=';
  private readonly VOTE_COUNT: string = '/discover/movie?sort_by=vote_count.desc&page=';
  public message = new Subject<any>();

  constructor (private httpClient: HttpClient) { }

  public getPopularMovies (page: number = 1): Observable<Category> {
    const url: string = this.POPULAR + page + this.API_KEY;
    return this.getMoviesBaseQuery(url, MovieCategory.popularMovies);
  }

  public getInTheaterMovies (page: number = 1): Observable<Category> {
    const url: string = this.IN_THEATER + page + this.API_KEY;
    return this.getMoviesBaseQuery(url, MovieCategory.inTheaterMovies);
  }

  public getPopularKidsMovies (page: number = 1): Observable<Category> {
    const url: string = this.KIDS + page + this.API_KEY;
    return this.getMoviesBaseQuery(url, MovieCategory.kidsMovies);
  }

  public getTopRatedMovies (page: number = 1): Observable<Category> {
    const url: string = this.VOTE_COUNT + page + this.API_KEY;
    return this.getMoviesBaseQuery(url, MovieCategory.topRatedMovies);
  }

  public searchMovie (movieSearch: string, page: number = 1): Observable<Category> {
    const url: string = '/search/movie' + this.API_KEY_ALT + `&query=${movieSearch}&page=${page}`;
    return this.getMoviesBaseQuery(url, 'Searched movies');
  }

  public getMovieDetails (id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(this.BASE_URL + `/movie/${id}` + this.API_KEY_ALT);
  }

  public getMoviesBaseQuery (url: string = this.lastUrl, genre: string = this.lastTitle): Observable<Category> {
    return this.httpClient.get<ResponseAPI>(this.BASE_URL + url)
      .pipe(
        map((data: ResponseAPI) => {
          const category: Category = new Category();
          category.movies = data.results;
          category.totalPages = data.total_pages;
          category.totalResults = data.total_results;
          category.title = genre;
          this.lastUrl = url;
          this.lastTitle = genre;
          return category;
        }));
  }
}
