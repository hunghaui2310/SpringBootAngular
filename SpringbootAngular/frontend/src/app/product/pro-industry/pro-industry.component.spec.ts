import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProIndustryComponent } from './pro-industry.component';

describe('ProIndustryComponent', () => {
  let component: ProIndustryComponent;
  let fixture: ComponentFixture<ProIndustryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProIndustryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
