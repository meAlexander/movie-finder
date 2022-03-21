import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../shared/models/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() public movie: Movie;
  @Output() public emitMovieId = new EventEmitter<number>();

  public imageUrl: string;
  public loadImage: boolean = true;

  ngOnInit () {
    this.imageUrl = 'https://image.tmdb.org/t/p/w500/' + this.movie.poster_path;
  }

  public clickViewMovieDetails (): void {
    this.emitMovieId.emit(this.movie.id);
  }

  public loadingImage (): void {
    this.loadImage = false;
  }
}
