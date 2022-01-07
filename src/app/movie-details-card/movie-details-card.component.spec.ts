import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsCardComponent } from './movie-details-card.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsCardComponent;
  let fixture: ComponentFixture<MovieDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
