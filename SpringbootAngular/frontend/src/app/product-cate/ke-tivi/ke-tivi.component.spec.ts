import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeTiviComponent } from './ke-tivi.component';

describe('KeTiviComponent', () => {
  let component: KeTiviComponent;
  let fixture: ComponentFixture<KeTiviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeTiviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeTiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
