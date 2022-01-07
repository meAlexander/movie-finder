import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() public categoryMovies: Movie[];
  @Output() public emitMovieId = new EventEmitter<number>();
  @Output() public emitViewAllCategoryMovies = new EventEmitter<string>();

  constructor () { }

  public showMovieDetailsPage (movieId: number): void {
    this.emitMovieId.emit(movieId);
  }

  public showAllCategoryMovies (): void {
    this.emitViewAllCategoryMovies.emit(this.categoryMovies[0].category);
  }
}
