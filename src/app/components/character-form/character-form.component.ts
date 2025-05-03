import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import {
  RACES,
  CLASSES,
  RACE_MODIFIERS,
  CLASS_MODIFIERS,
} from '../../models/modifiers.constants';

import { v4 as uuidv4 } from 'uuid'; // Instale: npm i uuid

const ATTRIBUTE_NAMES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
})
export class CharacterFormComponent implements OnInit {
  characterForm: FormGroup;
  attNames = ATTRIBUTE_NAMES;
  races = RACES;
  classes = CLASSES;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Exemplo de uso para preencher o form:
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      race: ['', Validators.required],
      class: ['', Validators.required],
      strength: [10, Validators.required],
      dexterity: [10, Validators.required],
      constitution: [10, Validators.required],
      intelligence: [10, Validators.required],
      wisdom: [10, Validators.required],
      charisma: [10, Validators.required],
      // Modificadores de raça
      strengthRaceModifier: [{ value: 0, disabled: true }],
      dexterityRaceModifier: [{ value: 0, disabled: true }],
      constitutionRaceModifier: [{ value: 0, disabled: true }],
      intelligenceRaceModifier: [{ value: 0, disabled: true }],
      wisdomRaceModifier: [{ value: 0, disabled: true }],
      charismaRaceModifier: [{ value: 0, disabled: true }],
      // Modificadores de classe
      strengthClassModifier: [{ value: 0, disabled: true }],
      dexterityClassModifier: [{ value: 0, disabled: true }],
      constitutionClassModifier: [{ value: 0, disabled: true }],
      intelligenceClassModifier: [{ value: 0, disabled: true }],
      wisdomClassModifier: [{ value: 0, disabled: true }],
      charismaClassModifier: [{ value: 0, disabled: true }],
    });

    const char = this.loadCharacterFromLocalStorage('id-do-personagem');
    if (char) {
      this.characterForm.patchValue(char);
    }
  }

  ngOnInit(): void {
    // Verifica se existe id na rota
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const char = this.loadCharacterFromLocalStorage(id);
        if (char) {
          this.characterForm.patchValue(char);
        }
      }
    });

    this.characterForm.get('race')?.valueChanges.subscribe((selectedRace) => {
      this.applyRaceModifiers(selectedRace);
    });
    this.characterForm.get('class')?.valueChanges.subscribe((selectedClass) => {
      this.applyClassModifiers(selectedClass);
    });
  }

  saveCharacterToLocalStorage(characterData: any): void {
    const id = uuidv4();
    const character = { id, ...characterData };
    const stored = localStorage.getItem('characters');
    const characters = stored ? JSON.parse(stored) : [];
    characters.push(character);
    localStorage.setItem('characters', JSON.stringify(characters));
  }

  loadCharacterFromLocalStorage(id: string): any | null {
    const stored = localStorage.getItem('characters');
    if (!stored) return null;
    const characters = JSON.parse(stored);
    return characters.find((c: any) => c.id === id) || null;
  }

  applyRaceModifiers(race: string): void {
    const modifiers = RACE_MODIFIERS[race] || {};
    ATTRIBUTE_NAMES.forEach((attr) => {
      this.characterForm
        .get(attr + 'RaceModifier')
        ?.setValue(modifiers[attr] || 0, { emitEvent: false });
    });
  }

  applyClassModifiers(selectedClass: string): void {
    const modifiers = CLASS_MODIFIERS[selectedClass] || {};
    ATTRIBUTE_NAMES.forEach((attr) => {
      this.characterForm
        .get(attr + 'ClassModifier')
        ?.setValue(modifiers[attr] || 0, { emitEvent: false });
    });
  }

  getFinalModifier(attr: string): number {
    const baseValue = this.characterForm.get(attr)?.value || 0;
    const attributeModifier = Math.floor((baseValue - 10) / 2);
    const raceModifier =
      this.characterForm.get(attr + 'RaceModifier')?.value || 0;
    const classModifier =
      this.characterForm.get(attr + 'ClassModifier')?.value || 0;
    return attributeModifier + raceModifier + classModifier;
  }

  /** Rola 4d6, descarta o menor, soma os 3 maiores */
  private roll4d6DropLowest(): number {
    const rolls = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * 6) + 1
    );
    rolls.sort((a, b) => a - b); // crescente
    // descarta o menor (primeiro)
    return rolls[1] + rolls[2] + rolls[3];
  }

  /** Rola todos os atributos conforme regra oficial */
  rollAttributes(): void {
    ATTRIBUTE_NAMES.forEach((attr) => {
      this.characterForm.get(attr)?.setValue(this.roll4d6DropLowest());
    });
  }

  onSubmit(): void {
    if (this.characterForm.valid) {
      this.saveCharacterToLocalStorage(this.characterForm.value);
      this.router.navigate(['/salvos']); // Redireciona para a lista (ajuste a rota se necessário)
    }
  }
}
