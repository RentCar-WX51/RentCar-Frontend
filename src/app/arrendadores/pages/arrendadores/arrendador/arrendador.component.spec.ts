import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendadorComponent } from './arrendador.component';

describe('ArrendadorComponent', () => {
  let component: ArrendadorComponent;
  let fixture: ComponentFixture<ArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrendadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
