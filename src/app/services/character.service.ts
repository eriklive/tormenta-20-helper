import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private storageKey = 'tormenta-character';

  saveCharacter(character: Character): void {
    localStorage.setItem(this.storageKey, JSON.stringify(character));
  }

  loadCharacter(): Character | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  deleteCharacter(): void {
    localStorage.removeItem(this.storageKey);
  }
}
