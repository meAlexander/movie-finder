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

  public movieDetails: Movie;
  public imageUrl: string;
  public loading: boolean = true;

  constructor (private movieService: MovieService) {}

  ngOnInit () {
    this.movieService.getMovieDetails(this.movieId).subscribe((data) => {
      this.movieDetails = data;
      this.imageUrl = 'https://image.tmdb.org/t/p/w500/' + this.movieDetails.poster_path;
      this.loading = false ;
    });
  }

  public backToHome (): void {
    this.backToHomeEvent.emit();
  }
}
