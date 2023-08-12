import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BullConversationComponent } from './bull-conversation.component';

describe('BullConversationComponent', () => {
  let component: BullConversationComponent;
  let fixture: ComponentFixture<BullConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BullConversationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BullConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
