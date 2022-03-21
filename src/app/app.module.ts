import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';

import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { HomePageComponent } from './components/home/home-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CategoryComponent } from './components/category/category.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { AllMoviesComponent } from './components/all-movies/all-movies.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { ExploreComponent } from './components/explore/explore.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    LayoutComponent,
    MovieCardComponent,
    FooterComponent,
    CategoryComponent,
    MovieDetailsComponent,
    AllMoviesComponent,
    LoadingComponent,
    ExploreComponent,
    SearchBoxComponent
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
