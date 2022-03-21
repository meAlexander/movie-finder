import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../../shared/models/category';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @Output() public goToCategoryMoviesEvent = new EventEmitter<Observable<Category>>();

  constructor (private movieService: MovieService) { }

  public searchMovie (searchForm: NgForm): void {
    const movieSearch: string = searchForm.value.movie;
    const searchedMovie$: Observable<Category> = this.movieService.searchMovie(movieSearch);
    this.goToCategoryMoviesEvent.emit(searchedMovie$);
  }
}
