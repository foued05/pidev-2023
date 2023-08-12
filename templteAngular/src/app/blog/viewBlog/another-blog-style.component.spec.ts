import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherBlogStyleComponent } from './another-blog-style.component';

describe('AnotherBlogStyleComponent', () => {
  let component: AnotherBlogStyleComponent;
  let fixture: ComponentFixture<AnotherBlogStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnotherBlogStyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotherBlogStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
