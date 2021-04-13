import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({ providedIn: 'root' })
export class HeroService {
  messages = [];

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id) as Hero;
    this.messages.push("Getting Hero " + id);
    return of(hero);
  }

  clearMessages() {
    this.messages = [];
  }
}
