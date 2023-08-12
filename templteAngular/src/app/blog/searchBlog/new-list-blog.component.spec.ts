import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListBlogComponent } from './new-list-blog.component';

describe('NewListBlogComponent', () => {
  let component: NewListBlogComponent;
  let fixture: ComponentFixture<NewListBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewListBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewListBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
