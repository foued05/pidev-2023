import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBlogListsComponent } from './new-blog-lists.component';

describe('NewBlogListsComponent', () => {
  let component: NewBlogListsComponent;
  let fixture: ComponentFixture<NewBlogListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBlogListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBlogListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
