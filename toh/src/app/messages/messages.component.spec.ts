import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroService } from '../hero.service';

import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let debug: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ],
      providers: [HeroService]
    })

    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a message after init', () => {
    component.heroSvc.getHero(21).subscribe();

    fixture.detectChanges();

    expect(debug.query(By.css('div')).nativeElement.textContent).toContain('Getting Hero')
  })

  it('should show no heros if clear is called after there is at least 1 message', () => {
    component.heroSvc.getHero(21).subscribe();
    fixture.detectChanges();

    component.clearMessages();
    fixture.detectChanges();

    expect(debug.queryAll(By.css('div')).length).toBe(0)
  })
});
