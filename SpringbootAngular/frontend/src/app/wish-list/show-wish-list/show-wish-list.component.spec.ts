import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWishListComponent } from './show-wish-list.component';

describe('ShowWishListComponent', () => {
  let component: ShowWishListComponent;
  let fixture: ComponentFixture<ShowWishListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowWishListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
