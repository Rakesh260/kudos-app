import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveKudos } from './give-kudos';

describe('GiveKudos', () => {
  let component: GiveKudos;
  let fixture: ComponentFixture<GiveKudos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiveKudos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiveKudos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
