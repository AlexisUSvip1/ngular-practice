import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesProfile } from './movies-profile';

describe('MoviesProfile', () => {
  let component: MoviesProfile;
  let fixture: ComponentFixture<MoviesProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
