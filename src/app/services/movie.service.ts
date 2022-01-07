import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { map, tap } from 'rxjs/operators';
import { AppConst } from '../const/app-const';
import { ResponseAPI } from '../models/response-api';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API_KEY: string = '&api_key=fd2b31ba31547fa1ed49129738f2d156';
  private readonly API_KEY_ALT: string = '?api_key=fd2b31ba31547fa1ed49129738f2d156';

  private readonly BASE_URL: string = 'https://api.themoviedb.org/3';

  private readonly POPULAR: string = '/discover/movie?sort_by=popularity.desc&page=';
  private readonly IN_THEATER: string = '/discover/movie?primary_release_date.gte=2021-12-01&primary_release_date.gte=2021-12-30&page=';
  private readonly KIDS: string = '/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&page=';
  private readonly VOTE_COUNT: string = '/discover/movie?sort_by=vote_count.desc&page=';

  public TOTAL_PAGES: number;
  public TOTAL_RESULTS: number;

  constructor (private httpClient: HttpClient) { }

  public getPopularMovies (page: number = 1): Observable<Movie[]> {
    return this.getMoviesBaseQuery(this.POPULAR, page)
      .pipe(
        tap(movies => movies.map(movie => movie.category = AppConst.popularMoviesTitle))
      );
  }

  public getInTheaterMovies (page: number = 1): Observable<Movie[]> {
    return this.getMoviesBaseQuery(this.IN_THEATER, page)
      .pipe(
        tap(movies => movies.map(movie => movie.category = AppConst.inTheaterMoviesTitle))
      );
  }

  public getPopularKidsMovies (page: number = 1): Observable<Movie[]> {
    return this.getMoviesBaseQuery(this.KIDS, page)
      .pipe(
        tap(movies => movies.map(movie => movie.category = AppConst.kidsMoviesTitle))
      );
  }

  public getMostVotedMovies (page: number = 1): Observable<Movie[]> {
    return this.getMoviesBaseQuery(this.VOTE_COUNT, page)
      .pipe(
        tap(movies => movies.map(movie => movie.category = AppConst.mostVotedMoviesTitle))
      );
  }

  public getMovieDetails (id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(this.BASE_URL + `/movie/${id}` + this.API_KEY_ALT);
  }

  public searchMovie (movieSearch: string, page: number = 1): Observable<Movie[]> {
    return this.httpClient.get<ResponseAPI>(this.BASE_URL + '/search/movie' + this.API_KEY_ALT + `&query=${movieSearch}&page=${page}`)
      .pipe(
        tap((data: ResponseAPI) => {
          this.TOTAL_PAGES = data.total_pages;
          this.TOTAL_RESULTS = data.total_results;
        }),
        map((data) => data.results)
      );
  }

  private getMoviesBaseQuery (url: string, page: number = 1): Observable<Movie[]> {
    return this.httpClient.get<ResponseAPI>(this.BASE_URL + url + page + this.API_KEY)
      .pipe(
        tap((data: ResponseAPI) => {
          this.TOTAL_PAGES = data.total_pages;
          this.TOTAL_RESULTS = data.total_results;
        }),
        map(data => data.results),
      );
  }
}
