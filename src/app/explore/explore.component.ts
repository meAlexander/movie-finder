import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../models/category';
import { MovieService } from '../services/movie.service';
import { CategoryMovieMetadata } from '../constants/category-movie-metadata';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  @Output() public emitCategory = new EventEmitter<Observable<Category>>();
  public categoryMovieMetadata: CategoryMovieMetadata[];

  constructor (public movieService: MovieService) {
  }

  ngOnInit (): void {
    this.categoryMovieMetadata = this.movieService.getCategoryMetadata();
  }

  public showCategory (categoryMetadata: CategoryMovieMetadata): void {
    const category$: Observable<Category> = this.movieService.getMoviesBaseQuery(categoryMetadata);
    this.emitCategory.emit(category$);
  }
}
