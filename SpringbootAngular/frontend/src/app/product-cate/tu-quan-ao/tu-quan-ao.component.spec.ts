import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuQuanAoComponent } from './tu-quan-ao.component';

describe('TuQuanAoComponent', () => {
  let component: TuQuanAoComponent;
  let fixture: ComponentFixture<TuQuanAoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuQuanAoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuQuanAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
