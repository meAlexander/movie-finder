import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() public category$: Observable<Category>;
  @Output() public emitMovieId = new EventEmitter<number>();
  @Output() public emitViewAllCategoryMovies = new EventEmitter<string>();

  public showMovieDetailsPage (movieId: number): void {
    this.emitMovieId.emit(movieId);
  }

  public showAllCategoryMovies (): void {
    this.category$.pipe(take(1)).subscribe((category) => {
      this.emitViewAllCategoryMovies.emit(category.title);
    });
  }
}
