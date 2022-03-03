import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { MovieCardComponent } from './movie-card/movie-card.component';
import { HomePageComponent } from './home/home-page.component';
import { LayoutComponent } from './layout/layout.component';
import { CategoryComponent } from './category/category.component';
import { MovieDetailsCardComponent } from './movie-details-card/movie-details-card.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { LoadingComponent } from './loading/loading.component';
import { ExploreComponent } from './explore/explore.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    LayoutComponent,
    MovieCardComponent,
    FooterComponent,
    CategoryComponent,
    MovieDetailsCardComponent,
    AllMoviesComponent,
    LoadingComponent,
    ExploreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
