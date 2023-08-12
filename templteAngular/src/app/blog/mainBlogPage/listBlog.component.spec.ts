import { ComponentFixture, TestBed } from '@angular/core/testing';

import { listBlog } from './listBlog.component';

describe('listBlog', () => {
  let component: listBlog;
  let fixture: ComponentFixture<listBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ listBlog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(listBlog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
