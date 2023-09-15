import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageerrorComponent } from './pageerror.component';

describe('PageerrorComponent', () => {
  let component: PageerrorComponent;
  let fixture: ComponentFixture<PageerrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageerrorComponent]
    });
    fixture = TestBed.createComponent(PageerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
