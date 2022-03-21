import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @ViewChild('homePage', { static: true }) private readonly homePageTemplate: TemplateRef<any>;
  @ViewChild('movieDetailsCard', { static: true }) private readonly movieDetailsCardTemplate: TemplateRef<any>;
  @ViewChild('allMovies', { static: true }) private readonly allMoviesTemplate: TemplateRef<any>;
  private _mainTemplate: TemplateRef<any>;

  public movieId: number;
  public category$: Observable<Category>;

  ngOnInit () {
    this.showTemplate();
  }

  get mainTemplate () {
    return this._mainTemplate;
  }

  public showTemplate (templateRef: TemplateRef<any> = this.homePageTemplate): void {
    this._mainTemplate = templateRef;
  }

  public showMovieDetailsTemplate (event: { movieId: number, category: Observable<Category> }): void {
    this.movieId = event.movieId;
    this.category$ = event.category;
    this.showTemplate(this.movieDetailsCardTemplate);
  }

  public showAllCategoryMoviesTemplate (category$: Observable<Category>): void {
    this.category$ = category$;
    this.showTemplate(this.allMoviesTemplate);
  }

  public loadPage (category: Observable<Category>): void {
    if (!category) {
      this.showTemplate();
      return;
    }
    this.showAllCategoryMoviesTemplate(category);
  }
}
