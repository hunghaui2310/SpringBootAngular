import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProCateComponent } from './pro-cate.component';

describe('ProCateComponent', () => {
  let component: ProCateComponent;
  let fixture: ComponentFixture<ProCateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProCateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
