import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImproveErrorComponent } from './improve-error.component';

describe('ImproveErrorComponent', () => {
  let component: ImproveErrorComponent;
  let fixture: ComponentFixture<ImproveErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImproveErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImproveErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
