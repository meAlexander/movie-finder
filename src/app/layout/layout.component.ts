import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  private _mainTemplate: TemplateRef<any>;

  @ViewChild('homePage', { static: true }) private readonly homePageTemplate: TemplateRef<any>;
  @ViewChild('movieDetailsCard', { static: true }) private readonly movieDetailsCardTemplate: TemplateRef<any>;
  @ViewChild('allMovies', { static: true }) private readonly allMoviesTemplate: TemplateRef<any>;

  public movieId: number;
  public categoryTitle: string;

  constructor () { }

  ngOnInit () {
    this.showTemplate();
  }

  get mainTemplate () {
    return this._mainTemplate;
  }

  public showTemplate (templateRef: TemplateRef<any> = this.homePageTemplate): void {
    this._mainTemplate = templateRef;
  }

  public showMovieDetailsTemplate (movieId: number): void {
    this.movieId = movieId;
    this.showTemplate(this.movieDetailsCardTemplate);
  }

  public showAllCategoryMovieTemplate (categoryTitle: string): void {
    this.categoryTitle = categoryTitle;
    this.showTemplate(this.allMoviesTemplate);
  }
}
