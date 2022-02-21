import { CategoryMovieMetadata } from './category-movie-metadata';

export const CATEGORY_MOVIES_METADATA: {
  [id: string]: CategoryMovieMetadata;
} = {
  POPULAR_MOVIES: {
    name: 'Popular movies',
    categoryUrl: '/discover/movie?sort_by=popularity.desc&page=',
    category: 'POPULAR_MOVIES'
  },
  THEATER_MOVIES: {
    name: 'Theater movies',
    categoryUrl: '/discover/movie?primary_release_date.gte=2021-12-01&primary_release_date.gte=2021-12-30&page=',
    category: 'THEATER_MOVIES'
  },
  KIDS_MOVIES: {
    name: 'Kids movies',
    categoryUrl: '/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&page=',
    category: 'KIDS_MOVIES'
  },
  TOP_RATED_MOVIES: {
    name: 'Top rated movies',
    categoryUrl: '/discover/movie?sort_by=vote_count.desc&page=',
    category: 'TOP_RATED_MOVIES'
  },
  SEARCHED_MOVIES: {
    name: 'Searched movies',
    categoryUrl: '',
    category: 'SEARCHED_MOVIES',
    searchParam: ''
  }
};
