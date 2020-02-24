import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanAnComponent } from './ban-an.component';

describe('BanAnComponent', () => {
  let component: BanAnComponent;
  let fixture: ComponentFixture<BanAnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanAnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
