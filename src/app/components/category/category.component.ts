import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() public category$: Observable<Category>;
  @Output() public emitMovieId = new EventEmitter<number>();
  @Output() public emitCategory = new EventEmitter<Observable<Category>>();

  public showMovieDetailsPage (movieId: number): void {
    this.emitMovieId.emit(movieId);
  }

  public showCategoryMoviesPage (): void {
    this.emitCategory.emit(this.category$);
  }
}
