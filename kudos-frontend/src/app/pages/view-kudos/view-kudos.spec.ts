import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewKudos } from './view-kudos';

describe('ViewKudos', () => {
  let component: ViewKudos;
  let fixture: ComponentFixture<ViewKudos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewKudos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewKudos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
