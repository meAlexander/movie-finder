import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { MovieService } from '../services/movie.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @Output() public goToMovieDetailsEvent = new EventEmitter();
  @Output() public goToCategoryMoviesEvent = new EventEmitter<Observable<Category>>();

  public allMovies$: Observable<Category>[] = [];

  constructor (private movieService: MovieService) {
  }

  ngOnInit () {
    this.prepareMovies();
  }

  public showMovieDetailsPage (movieId: number): void {
    this.goToMovieDetailsEvent.emit({movieId, category: undefined});
  }

  public showCategoryMoviesPage (category$: Observable<Category>): void {
    this.goToCategoryMoviesEvent.emit(category$);
  }

  public searchMovie (searchForm: NgForm): void {
    const movieSearch: string = searchForm.value.movie;
    const searchedMovie$: Observable<Category> = this.movieService.searchMovie(movieSearch);
    this.showCategoryMoviesPage(searchedMovie$);
  }

  private prepareMovies (): void {
    for (const categoryMetadata of this.movieService.getCategoryMetadata()) {
      this.allMovies$.push(this.movieService.getMoviesBaseQuery(categoryMetadata));
    }
  }
}
