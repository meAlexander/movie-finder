import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-details-card',
  templateUrl: './movie-details-card.component.html',
  styleUrls: ['./movie-details-card.component.css']
})
export class MovieDetailsCardComponent implements OnInit {
  @Input() public movieId: number;
  @Output() public backToHomeEvent = new EventEmitter();

  public movie: Movie;
  public imageUrl: string;

  constructor (private movieService: MovieService) {}

  ngOnInit () {
    this.movieService.getMovieDetails(this.movieId).subscribe((data: Movie) => {
      this.movie = data;
      this.imageUrl = 'https://image.tmdb.org/t/p/w500/' + this.movie.poster_path;
    });
  }

  public backToHome (): void {
    this.backToHomeEvent.emit();
  }
}
