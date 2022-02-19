import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() public category$: Observable<Category>;
  @Output() public emitMovieId = new EventEmitter<number>();
  @Output() public emitViewAllCategoryMovies = new EventEmitter<Observable<Category>>();

  public showMovieDetailsPage (movieId: number): void {
    this.emitMovieId.emit(movieId);
  }

  public showAllCategoryMovies (): void {
    this.emitViewAllCategoryMovies.emit(this.category$);
  }
}
